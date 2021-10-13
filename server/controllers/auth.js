const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const axios = require("axios");
const {
  saltRounds,
  oauth: { naverClientId, naverClientSecret, googleClientId, googleClientSecret },
} = require("../config");
const { User, Habit } = require("../models");
const { generateAccessToken, setCookie, clearCookie } = require("./token");

const getUniqueNickname = async (nick, num = 1) => {
  let tempNick = nick;
  const foundUserByNickname = await User.findOne({ where: { nickname: nick } });
  if (foundUserByNickname) {
    if (num !== 1) {
      [tempNick] = tempNick.split("_");
    }
    tempNick = `${tempNick}_${num}`;
    return getUniqueNickname(tempNick, num + 1);
  }
  return nick;
};

module.exports = {
  checkNickname: async (req, res) => {
    const { nickname } = req.params;
    console.log(nickname);
    const foundUser = await User.findOne({ where: { nickname } });
    if (foundUser) {
      return res.status(202).json({ message: `${nickname} already exists` });
    }
    return res.status(200).json({ message: "Valid nickname" });
  },

  checkEmail: async (req, res) => {
    const { email } = req.params;
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      const { sns } = foundUser.dataValues;
      return res.status(409).json({ message: `${email} already exists`, data: { sns } });
    }
    return res.status(200).json({ message: "Valid email" });
  },

  me: async (req, res) => {
    const foundUser = await User.findOne({
      where: { users_id: req.userId },
      attributes: { exclude: ["password"] },
    });

    if (!foundUser) {
      return res.status(202).json({ message: "User not found" });
    }

    const refinedUser = {
      usersId: foundUser.dataValues.users_id,
      email: foundUser.dataValues.email,
      nickname: foundUser.dataValues.nickname,
      bio: foundUser.dataValues.bio,
      image: foundUser.dataValues.image,
    };

    const userhabits = await foundUser.getUserhabits();
    const refinedUserhabits = userhabits.map(({ habits_id: habitsId, end_date: endDate, done }) => {
      return {
        habitsId,
        endDate,
        done,
      };
    });
    const habits = await Promise.all(
      refinedUserhabits.map(async ({ habitsId, endDate, done }) => {
        const foundHabit = await Habit.findOne({ where: { habits_id: habitsId } });
        const { user_count: userCount, title, emoji_id: emojiId, color } = foundHabit.dataValues;
        const topUsers = await foundHabit.getUserhabits({
          limit: 5,
          order: [["achievement", "desc"]],
          include: [{ model: User, attributes: ["users_id", "image"] }],
          attributes: [],
        });
        const refinedTopUsers = topUsers.map(
          ({
            dataValues: {
              User: {
                dataValues: { users_id: usersId, image },
              },
            },
          }) => ({
            usersId,
            image,
          })
        );
        return {
          habitsId,
          userCount,
          title,
          emojiId,
          color,
          endDate,
          done,
          topUsers: refinedTopUsers,
        };
      })
    );

    return res.status(200).json({ message: "Valid user", data: { ...refinedUser, habits } });
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    const foundUserByEmail = await User.findOne({ where: { email } });
    if (!foundUserByEmail) {
      return res.status(202).json({ message: "아이디 또는 비밀번호를 잘못 입력하셨습니다." });
    }

    const { sns } = foundUserByEmail.dataValues;
    if (sns !== "local") {
      return res.status(202).json({ message: `${email} already exists`, sns });
    }

    const isValidPassword = await bcrypt.compare(password, foundUserByEmail.dataValues.password);
    if (!isValidPassword) {
      return res.status(202).json({ message: "아이디 또는 비밀번호를 잘못 입력하셨습니다." });
    }

    const token = generateAccessToken(foundUserByEmail.dataValues.users_id);

    setCookie(res, token);

    delete foundUserByEmail.dataValues.password;

    const refinedUser = {
      usersId: foundUserByEmail.dataValues.users_id,
      email: foundUserByEmail.dataValues.email,
      nickname: foundUserByEmail.dataValues.nickname,
      bio: foundUserByEmail.dataValues.bio,
      image: foundUserByEmail.dataValues.image,
    };

    const userhabits = await foundUserByEmail.getUserhabits();
    const refinedUserhabits = userhabits.map(({ habits_id: habitsId, end_date: endDate, done }) => {
      return {
        habitsId,
        endDate,
        done,
      };
    });
    const habits = await Promise.all(
      refinedUserhabits.map(async ({ habitsId, endDate, done }) => {
        const foundHabit = await Habit.findOne({ where: { habits_id: habitsId } });
        const { user_count: userCount, title, emoji_id: emojiId, color } = foundHabit.dataValues;
        const topUsers = await foundHabit.getUserhabits({
          limit: 5,
          order: [["achievement", "desc"]],
          include: [{ model: User, attributes: ["users_id", "image"] }],
          attributes: [],
        });
        const refinedTopUsers = topUsers.map(
          ({
            dataValues: {
              User: {
                dataValues: { users_id: usersId, image },
              },
            },
          }) => ({
            usersId,
            image,
          })
        );
        return {
          habitsId,
          userCount,
          title,
          emojiId,
          color,
          endDate,
          done,
          topUsers: refinedTopUsers,
        };
      })
    );

    return res.status(200).json({ message: "Signed in", data: { ...refinedUser, habits } });
  },

  signout: (req, res) => {
    const { jwt } = req.cookies;
    clearCookie(res, jwt);
    res.status(205).json({ message: "Signed out" });
  },

  signup: async (req, res) => {
    const { nickname, email, password } = req.body;

    const foundUserByNickname = await User.findOne({ where: { nickname } });
    if (foundUserByNickname) {
      return res.status(409).json({ message: `${nickname} already exists` });
    }

    const foundUserByEmail = await User.findOne({ where: { email } });
    if (foundUserByEmail) {
      const { sns } = foundUserByEmail.dataValues;
      return res.status(409).json({ message: `${email} already exists`, data: { sns } });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
      users_id: uuid(),
      nickname,
      email,
      password: hashed,
      sns: "local",
    });
    const foundUser = await User.findOne({
      where: { users_id: createdUser.dataValues.users_id },
      attributes: { exclude: ["password", "bio", "image", "sns", "createdAt", "updatedAt"] },
    });

    const refinedUser = {
      usersId: foundUser.dataValues.users_id,
      email: foundUser.dataValues.email,
      nickname: foundUser.dataValues.nickname,
    };

    const token = generateAccessToken(foundUser.dataValues.users_id);

    setCookie(res, token);

    return res.status(201).json({ message: "Signed up", data: refinedUser });
  },

  getNaver: async (req, res) => {
    const { authorizationCode } = req.body;
    const params = {
      grant_type: "authorization_code",
      client_id: naverClientId,
      client_secret: naverClientSecret,
      code: authorizationCode,
      state: "naver",
    };
    const axiosRes = await axios({
      method: "post",
      url: "https://nid.naver.com/oauth2.0/token",
      params,
    });
    if (axiosRes.status === 200) {
      const { access_token: accessToken } = axiosRes.data;
      const profileRes = await axios({
        method: "get",
        url: "https://openapi.naver.com/v1/nid/me",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (profileRes.status === 200) {
        const { nickname, email } = profileRes.data.response;
        let tempNickname = nickname;
        const foundUser = await User.findOne({ where: { email, sns: "naver" } });
        // email이 있고 sns가 naver 인 경우, 그 유저로 로그인시킨다.
        if (foundUser) {
          const token = generateAccessToken(foundUser.dataValues.users_id);
          setCookie(res, token);
          delete foundUser.dataValues.password;

          const refinedUser = {
            usersId: foundUser.dataValues.users_id,
            email: foundUser.dataValues.email,
            nickname: foundUser.dataValues.nickname,
            bio: foundUser.dataValues.bio,
            image: foundUser.dataValues.image,
          };

          const userhabits = await foundUser.getUserhabits();
          const refinedUserhabits = userhabits.map(
            ({ habits_id: habitsId, end_date: endDate, done }) => {
              return {
                habitsId,
                endDate,
                done,
              };
            }
          );
          const habits = await Promise.all(
            refinedUserhabits.map(async ({ habitsId, endDate, done }) => {
              const foundHabit = await Habit.findOne({ where: { habits_id: habitsId } });
              const {
                user_count: userCount,
                title,
                emoji_id: emojiId,
                color,
              } = foundHabit.dataValues;
              const topUsers = await foundHabit.getUserhabits({
                limit: 5,
                order: [["achievement", "desc"]],
                include: [{ model: User, attributes: ["users_id", "image"] }],
                attributes: [],
              });
              const refinedTopUsers = topUsers.map(
                ({
                  dataValues: {
                    User: {
                      dataValues: { users_id: usersId, image },
                    },
                  },
                }) => ({
                  usersId,
                  image,
                })
              );
              return {
                habitsId,
                userCount,
                title,
                emojiId,
                color,
                endDate,
                done,
                topUsers: refinedTopUsers,
              };
            })
          );

          return res.status(200).json({ message: "Signed in", data: { ...refinedUser, habits } });
        }
        const { profile_image: image } = profileRes.data.response;
        // email이 없는 경우, 유저 생성
        // nickname이 중복되는 경우
        tempNickname = await getUniqueNickname(tempNickname);

        const createdUser = await User.create({
          users_id: uuid(),
          nickname: tempNickname,
          image,
          email,
          sns: "naver",
        });

        const refinedUser = {
          usersId: createdUser.dataValues.users_id,
          email: createdUser.dataValues.email,
          nickname: createdUser.dataValues.nickname,
          image: createdUser.dataValues.image,
        };

        const token = generateAccessToken(createdUser.dataValues.users_id);
        setCookie(res, token);
        return res.status(201).json({ message: "Signed up", data: refinedUser });
      }
    }

    return res.status(axiosRes.status).json({ message: "Error occured during social login" });
  },

  getGoogle: async (req, res) => {
    const { authorizationCode } = req.body;
    const params = {
      grant_type: "authorization_code",
      client_id: googleClientId,
      client_secret: googleClientSecret,
      code: authorizationCode,
      redirect_uri: "http://localhost:3000/mypage",
    };
    const axiosRes = await axios({
      method: "post",
      url: "https://oauth2.googleapis.com/token",
      params,
    });
    if (axiosRes.status === 200) {
      const { access_token: accessToken } = axiosRes.data;
      const profileRes = await axios({
        method: "get",
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (profileRes.status === 200) {
        const { name: nickname, email } = profileRes.data;
        let tempNickname = nickname;
        const foundUser = await User.findOne({ where: { email, sns: "google" } });
        // email이 있고 sns가 naver 인 경우, 그 유저로 로그인시킨다.
        if (foundUser) {
          const token = generateAccessToken(foundUser.dataValues.users_id);
          setCookie(res, token);
          delete foundUser.dataValues.password;

          const refinedUser = {
            usersId: foundUser.dataValues.users_id,
            email: foundUser.dataValues.email,
            nickname: foundUser.dataValues.nickname,
            bio: foundUser.dataValues.bio,
            image: foundUser.dataValues.image,
          };

          const userhabits = await foundUser.getUserhabits();
          const refinedUserhabits = userhabits.map(
            ({ habits_id: habitsId, end_date: endDate, done }) => {
              return {
                habitsId,
                endDate,
                done,
              };
            }
          );
          const habits = await Promise.all(
            refinedUserhabits.map(async ({ habitsId, endDate, done }) => {
              const foundHabit = await Habit.findOne({ where: { habits_id: habitsId } });
              const {
                user_count: userCount,
                title,
                emoji_id: emojiId,
                color,
              } = foundHabit.dataValues;
              const topUsers = await foundHabit.getUserhabits({
                limit: 5,
                order: [["achievement", "desc"]],
                include: [{ model: User, attributes: ["users_id", "image"] }],
                attributes: [],
              });
              const refinedTopUsers = topUsers.map(
                ({
                  dataValues: {
                    User: {
                      dataValues: { users_id: usersId, image },
                    },
                  },
                }) => ({
                  usersId,
                  image,
                })
              );
              return {
                habitsId,
                userCount,
                title,
                emojiId,
                color,
                endDate,
                done,
                topUsers: refinedTopUsers,
              };
            })
          );

          return res.status(200).json({ message: "Signed in", data: { ...refinedUser, habits } });
        }

        const { picture: image } = profileRes.data;

        // email이 없는 경우, 유저 생성
        // nickname이 중복되는 경우
        tempNickname = await getUniqueNickname(tempNickname);

        const createdUser = await User.create({
          users_id: uuid(),
          nickname: tempNickname,
          image,
          email,
          sns: "google",
        });

        const refinedUser = {
          usersId: createdUser.dataValues.users_id,
          email: createdUser.dataValues.email,
          nickname: createdUser.dataValues.nickname,
          image: createdUser.dataValues.image,
        };

        const token = generateAccessToken(createdUser.dataValues.users_id);
        setCookie(res, token);
        return res.status(201).json({ message: "Signed up", data: refinedUser });
      }
    }

    return res.status(axiosRes.status).json({ message: "Error occured during social login" });
  },
};

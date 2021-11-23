import User from "../../database/models/user"

const getUser = async (req, res) => {
  const { idUser} = req.params;
  const user = await User.findById(idUser);
  res.json(user);
}

export default getUser;
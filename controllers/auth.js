const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const Register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const isUser = await prisma.user.findUnique({ where: { email } });
    if (isUser) return res.status(401).json({ message: "Email Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error creating user", error });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json(token);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Error logging in!", error });
  }
};

module.exports = { Register, Login };

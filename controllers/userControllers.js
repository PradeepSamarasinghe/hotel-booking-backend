import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_strong_secret'
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10

export async function postUser(req, res) {
  try {
    const userData = req.body

    // basic check for existing email
    const exists = await User.findOne({ email: userData.email })
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // hash password and save
    const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS)
    userData.password = passwordHash

    const newUser = new User(userData)
    await newUser.save()

    return res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    return res.status(500).json({ message: 'Error creating user', error: err.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    // find by email only
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // compare plaintext password with stored hash
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // prepare payload and sign token
    const payload = {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastName: user.lastName,
      type: user.type
    }

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })

    // return token and safe user info (no password)
    const safeUser = {
      id: user._id,
      email: user.email,
      //password: user.password,
      firstname: user.firstname,
      lastName: user.lastName,
      type: user.type,
      disable: user.disable,
      emailVerified: user.emailVerified
    }

    return res.status(200).json({ message: 'Login successful', token, user: safeUser })
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in', error: err.message })
  }
}
//admin validation
export function isAdminValid(req){
    if(req.user == null) {
        return false;
    }
    if(req.user.type !== 'admin') {
        return false;
    }
    return true;
} 
//customer validation
export function isCustomerValid(req){
  if(req.user == null){
      return false;
  }
  if(req.user.type !== 'customer'){
      return false;
  }
  return true;
}

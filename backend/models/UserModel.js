import mongoose, { Schema } from "mongoose"
import date from "date-and-time"
import crypto from "crypto"
import nodemailer from "nodemailer"

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: function () {
                // require email if phone is not provided
                return !this.phone;
            },
            // unique: true
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        phone: {
            type: String,
            required: function () {
                // require email if phone is not provided
                return !this.email;
            },
        },
        phoneVerificationCode: String,
        phoneVerificationExpiry: Date,
        emailVerificationCode: String,
        emailVerificationExpiry: Date,
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        savedLocations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Location",
            },
        ],
        accessToken: {
            type: String,
        },
        refreshToken: [String],
        provider: {
            type: String,
            default: "email",
        },
        birthday: {
            type: Date,
        },
        paymentMethod: {
            type: Schema.Types.ObjectId,
            ref: "PaymentMethod"
        }
    },
    {
        timestamps: true,
    }
)

// get review count
UserSchema.virtual("reviewCount").get(function () {
    return this.reviews.length
})

// format createdAt date
UserSchema.virtual("createdAtFormatted").get(function () {
    return date.format(this.createdAt, "dddd MMM DD, YYYY")
})

// method to send a PHONE verification code
UserSchema.methods.sendPhoneVerification = async function () {
    // Generate a random verification code, 4 digit code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Set the verification code and its epiry time
    this.phoneVerificationCode = verificationCode;
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 10); // Verification code
    this.phoneVerificationExpiry = expiryTime;

    // TODO: Send the verification code to the user's phone via SMS
    // You'll need to use and SMS service to send the code

    return verificationCode; // Return the 4-digit code in case you want to use it for further processing
}

// method to send a EMAIL verification code
UserSchema.methods.sendEmailVerification = async function () {
    // Generate a unique verification token
    const verificationCode = crypto.randomBytes(20).toString('hex')

    // Set the verification code and its epiration time
    this.emailVerificationCode = verificationCode;
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24); // Verification code
    this.emailVerificationExpiry = expiryTime;

    // Save the updated user
    await this.save()

    // Create a nodemailer transporter (adjust as per the email service that will be used)
    const transporter = nodemailer.createTransport({
        service: 'EmailService',
        auth: {
            user: 'nodemailer@email.com',
            pass: "password" // hide this in process.env
        }
    });

    // Send the email verification link to the user's email address
    const verificationLink = `http://your-website.com/verify-email/${verificationCode}`
    const mailOptions = {
        from: 'dummy@email.com',
        to: this.email,
        subject: 'Email Verification',
        text: `To verify your emil, click on the following link: ${verificationLink}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

export default mongoose.model("User", UserSchema)

// // match user entered password to hashed password in database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// };

// // encrypt password using bcrypt hashing
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
// })

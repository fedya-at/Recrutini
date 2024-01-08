// controllers/appointmentController.js
import Appointment from "../models/appointmentModel.js";
import nodemailer from "nodemailer";

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { date, time, hrId, candidateId, address, googleMeetLink } = req.body;

  try {
    const newAppointment = new Appointment({
      date,
      time,
      hrId,
      candidateId,
      address,
      googleMeetLink,
    });

    const savedAppointment = await newAppointment.save();
    sendCongratulationsEmail(savedAppointment);

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update appointment by ID
export const updateAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;
  const updateData = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete appointment by ID
export const deleteAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(deletedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAppointmentsByDate = async (req, res) => {
  const selectedDate = req.query.date;

  try {
    const appointments = await Appointment.find({ date: selectedDate });

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "No appointments found for the selected date" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendCongratulationsEmail = (appointment) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "florakenz41@gmail.com",
      pass: "Flora4588",
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false, // Bypass SSL certificate verification
    },
    secure: true,
  });

  const mailOptions = {
    from: "florakenz41@gmail.com",
    to: appointment.candidateId.email,
    subject: "Next Step : Interview ",
    text: `Subject: 	  subject: 'Next Step : Interview ', \n\n
	  Dear ${appointment.candidateId.firstName},\n\n
	  I hope this email finds you well.\n\n
	  am writing to extend my heartfelt congratulations on successfully proceeding to the next step in our selection process. Your qualifications and achievements have stood out, and we are impressed with your potential contribution to our team.\n\n

	  As you move forward, we would like to invite you to the next stage of the assessment process. This step will provide us with an opportunity to further evaluate your skills and experience, and to discuss in more detail how your expertise aligns with our company's goals.\n\n
	  
	  Next Steps:\n\n
	  Please find below the details for the upcoming interview:\n\n

	  Date: ${appointment.date}\n\n
	Time:  ${appointment.time}\n\n
	Location/Meeting Link:  ${appointment.address} -  ${appointment.googleMeetLink}\n\n
	If the interview is scheduled to take place in person, please ensure you arrive at the venue on time. If it is an online interview, kindly use the provided link to join the virtual meeting.\n\n

	Should you have any questions or require further clarification, feel free to reach out to our Human Resources department at [HR Email Address] or [HR Phone Number].\n\n

	Once again, congratulations on reaching this milestone, and we look forward to getting to know you better during the next stage of the selection process.\n\n

	Best regards,\n\n

	Company X\n\n
	  `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

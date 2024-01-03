// seeder.js
import mongoose from "mongoose";
import connectToDatabase from "./config/db.js";
import User from "./models/userModel.js";
import Appointment from "./models/appointmentModel.js";
import Offre from "./models/offreModel.js";

const usersToSeed = [
  {
    username: "admin",
    firstName: "Lewis",
    lastName: "Hamilton",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    username: "jpierre",
    firstName: "Jean",
    lastName: "Pierre",
    email: "John@example.com",
    password: "123456",
    role: "hr",
  },
  {
    username: "jsmith",
    firstName: "Jane",
    lastName: "Smith",
    email: "Jane@example.com",
    password: "123456",
    role: "hr",
  },
  {
    username: "csainez",
    firstName: "Carlos",
    lastName: "Sainez",
    email: "Carlos@example.com",
    password: "123456",
    role: "candidate",
  },
  {
    username: "clecrec",
    firstName: "Charles",
    lastName: "Lecrec",
    email: "Charles@example.com",
    password: "123456",
    role: "candidate",
  },
  {
    username: "lnoris",
    firstName: "Lando",
    lastName: "Noris",
    email: "Lando@example.com",
    password: "123456",
    role: "candidate",
  },
];

const offersData = [
  {
    title: "Web Developer",
    company: "Tech Solutions",
    companyDescription: "Innovative technology solutions provider",
    employeesNeeded: 3,
    RoleDescription: "Exciting opportunity for a skilled web developer.",
    location: "Remote",
    description:
      "Join our dynamic team and contribute to cutting-edge web development projects.",
    skills: ["JavaScript", "React", "Node.js"],
    salary: 80000,
    whatWeOffre: "Competitive salary and benefits",
    dateFin: new Date("2024-12-31"),
  },
  {
    title: "Data Analyst",
    company: "Data Insights",
    companyDescription: "Data analytics company",
    employeesNeeded: 2,
    RoleDescription: "Analyzing and interpreting complex data sets.",
    location: "New York",
    description: "Join our data analytics team and make meaningful insights.",
    skills: ["Python", "SQL", "Data Visualization"],
    salary: 75000,
    whatWeOffre: "Opportunity to work with cutting-edge data technologies",
    dateFin: new Date("2024-11-30"),
  },
  {
    title: "UX/UI Designer",
    company: "Design Innovations",
    companyDescription: "Creative design agency",
    employeesNeeded: 1,
    RoleDescription: "Creating visually appealing and user-friendly designs.",
    location: "San Francisco",
    description:
      "Bring your design skills to a collaborative and innovative environment.",
    skills: ["UI/UX", "Sketch", "Adobe XD"],
    salary: 70000,
    whatWeOffre: "Collaborative and inspiring design projects",
    dateFin: new Date("2024-10-31"),
  },
  {
    title: "Software Engineer",
    company: "CodeCrafters",
    companyDescription: "Software development company",
    employeesNeeded: 4,
    RoleDescription: "Developing scalable and efficient software solutions.",
    location: "Austin",
    description: "Be part of a team delivering cutting-edge software products.",
    skills: ["Java", "Spring Boot", "MongoDB"],
    salary: 90000,
    whatWeOffre: "Exciting projects in the software development space",
    dateFin: new Date("2024-09-30"),
  },
  {
    title: "Marketing Specialist",
    company: "MarketPro",
    companyDescription: "Marketing solutions provider",
    employeesNeeded: 2,
    RoleDescription:
      "Developing and implementing strategic marketing initiatives.",
    location: "Chicago",
    description: "Shape the future of marketing with our innovative solutions.",
    skills: ["Digital Marketing", "SEO", "Social Media"],
    salary: 85000,
    whatWeOffre: "Opportunity to lead impactful marketing campaigns",
    dateFin: new Date("2024-08-31"),
  },
];

async function seed() {
  try {
    await connectToDatabase();

    // await User.deleteMany({});
    // await Appointment.deleteMany({});
    await Offre.deleteMany({});

    //const seededUsers = await User.insertMany(usersToSeed);
    //const seedAppointment = await Appointment.insertMany(appointmentsToSeed);
    const seedOffers = await Offre.insertMany(offersData);

    console.log(
      "Database seeded successfully with users and appointments:",
      // seededUsers,
      //seedAppointment
      seedOffers
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

async function unseed() {
  try {
    await connectToDatabase();

    //await User.deleteMany({});
    // await Appointment.deleteMany({});

    await Offre.deleteMany({});
    console.log("Data Destroyed !".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  unseed();
} else {
  seed();
}

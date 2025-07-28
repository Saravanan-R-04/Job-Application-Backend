# 🧰 Job Board Backend 

A RESTful backend API for a Job Board Application built using **Node.js**, **Express.js**, and **MongoDB**. 
This system supports multiple user roles including Job Seekers, Recruiters, and Admins with role-based access to different features.

---

## 🚀 Features

### 👤 Job Seeker

These users are individuals looking for jobs.

**Capabilities:**
- Register and log in
- View and update personal profile (skills, resume, etc.)
- Browse available jobs (with filters like location, salary, keyword)
- Apply for jobs with resume and optional cover letter
- Save/bookmark jobs for later
- View application history (pending, accepted, rejected)
- Edit/delete their own job applications

---

### 🧑‍💼 Recruiter / Employer

These users are companies or individuals posting job opportunities.

**Capabilities:**
- Register and log in
- Create, edit, and delete job postings
- View a dashboard of all posted jobs
- View list of applicants for each job
- Access applicant profiles and resumes
- Change application status (accepted/rejected)

---

### 👨‍💼 Admin

This is the superuser role with full control over the system.

**Capabilities:**
- Manage all user accounts (job seekers and recruiters)
- Deactivate or delete users
- Monitor or delete job postings (e.g., spam, fake)
- View all applications

---



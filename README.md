# Pulse - Blockchain IP Registration Platform

This project is a platform for registering intellectual property (IP) on the blockchain. It provides a user-friendly interface for creators to securely record their IPs, manage rights, and view analytics.

## Features

* **IP Registration:** Easily register various forms of IP (e.g., music, videos, documents) with detailed information.
* **Rights Management:** Define and manage the rights associated with your IP (exclusive, non-exclusive, limited).
* **Blockchain Integration:** Securely store IP registration data on the blockchain for immutability and transparency.
* **User Dashboard:** View registered IPs, creator credentials, analytics, and other relevant information.
* **ZPK Generation:** Generate Zero-Knowledge Proofs (ZPKs) for enhanced privacy and security.
* **Collaboration Tools:** Facilitate collaboration with other creators.
* **Analytics and Reporting:** Gain insights into IP performance and usage.
* **User Credentials:** Manage user credentials securely.
* **Responsive Design:** Accessible on various devices.

## Getting Started

### Prerequisites

* Node.js (latest LTS version recommended)
* npm (or yarn, pnpm)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KhushiSonkusare/Pulse.git
    cd Pulse
    ```

2.  **Install dependencies:**

    ```bash
    npm install --legacy-peer-deps
    ```

    * `--legacy-peer-deps` is used to bypass potential peer dependency issues.

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the development server. Open your browser and navigate to `http://localhost:3000` to view the application.

## Project Structure

* `pages/`: Contains the Next.js pages for different routes.
    * `index.js`: The main dashboard page.
    * `register.js`: The IP registration form.
    * `credentials.js`: The credentials page.
    * And other pages for other features.
* `components/`: Contains reusable React components.
* `public/`: Contains static assets like images.
* `.gitignore`: Specifies files and directories to be ignored by Git.

## Key Technologies

* **Next.js:** React framework for building server-rendered and statically generated applications.
* **React:** JavaScript library for building user interfaces.
* **Lucide React:** Icon library.
* **React Datepicker:** A datepicker component.
* **Tailwind CSS:** CSS framework for utility-first styling.
* **Blockchain (Integration to be further defined):** For secure IP registration and management.

## IP Registration Page (register.js)

The IP registration page allows users to register their intellectual property by providing the following information:

* **Asset Title:** The title of the IP.
* **Description:** A detailed description of the IP.
* **Creation Date:** The date the IP was created.
* **Rights Management:** Specifies the rights associated with the IP (exclusive, non-exclusive, limited).
* **Upload MP4 File:** Uploads a file related to the IP (e.g., a video).

The page includes input validation and a progress bar to indicate the completion of the registration process.

## Dashboard (index.js)

The dashboard provides an overview of the user's IP registrations and related information. It includes:

* **Featured Content:** Displays a recent IP with details and an image.
* **Stats Cards:** Shows key statistics like registered IP assets, creator credentials, and profile views.
* **Creator Credentials:** Displays images representing creator credentials.
* **Latest Album/Singles:** Lists the latest albums and singles.
* **Responsive Sidebar:** Navigation sidebar that adapts to different screen sizes.


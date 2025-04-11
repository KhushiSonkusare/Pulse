"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../countdown.module.css";
import { usePathname } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

const TARGET_DATE = new Date("2025-04-18T00:00:00");
const page = ({ params }: Props) => {
  const pathname = usePathname();
  

  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  // MODIFY THIS SLUG TO GET THE DETAILS OF THE SONG ///
  const slug = pathname.split("/")[2];
  //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [prevTime, setPrevTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();

      if (difference > 0) {
        setPrevTime((current) => timeLeft);

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // If we've reached the release date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []); // Remove timeLeft from dependencies

  // Check if each unit has changed
  const hasChanged = {
    days: prevTime.days !== timeLeft.days && prevTime.days !== 0,
    hours: prevTime.hours !== timeLeft.hours && prevTime.hours !== 0,
    minutes: prevTime.minutes !== timeLeft.minutes && prevTime.minutes !== 0,
    seconds: prevTime.seconds !== timeLeft.seconds && prevTime.seconds !== 0,
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left side - Record */}
        <div className={styles.recordSection}>
          <div className={styles.stylusWrapper}>
            <Image
              src="/images/stylus.png"
              alt="Record player stylus"
              width={250}
              height={400}
              className={styles.stylusImage}
              priority
            />
          </div>
          <div className={styles.vinylWrapper}>
            <Image
              src="/images/records.png"
              alt="Vinyl record"
              width={565}
              height={565}
              className={styles.vinylImage}
              priority
            />
          </div>
        </div>

        {/* Black overlay rectangle */}
        <div className={styles.overlayRect}>
          {/* Right side - Countdown and info */}
          <div className={styles.contentWrapper}>
            <div className={styles.countdownSection}>
              <h2 className={styles.releaseText}>
                <span className={styles.newMusic}>{slug}</span> RELEASING IN
              </h2>

              <div className={styles.countdown}>
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.days ? styles.slideAnimation : ""
                      }`}
                    >
                      <span className={styles.numberCurrent}>
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                      <span className={styles.numberNext}>
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.label}>DAYS</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.hours ? styles.slideAnimation : ""
                      }`}
                    >
                      <span className={styles.numberCurrent}>
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className={styles.numberNext}>
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.label}>HOURS</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.minutes ? styles.slideAnimation : ""
                      }`}
                    >
                      <span className={styles.numberCurrent}>
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className={styles.numberNext}>
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.label}>MINUTES</div>
                </div>

                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div
                      className={`${styles.number} ${
                        hasChanged.seconds ? styles.slideAnimation : ""
                      }`}
                    >
                      <span className={styles.numberCurrent}>
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className={styles.numberNext}>
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.label}>SECONDS</div>
                </div>
              </div>

              <div className={styles.pulsingDot}>
                <div className={styles.dot}></div>
                <div className={styles.ripple}></div>
              </div>
            </div>
            <button className={styles.notifyButton}>GET NOTIFIED</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./countdown.module.css"

// Define target date outside the component to prevent recreation on each render
const TARGET_DATE = new Date("2025-04-18T00:00:00")

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [prevTime, setPrevTime] = useState({
    days: 0,
    hours: 0, 
    minutes: 0,
    seconds: 0
  })
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime()
      
      if (difference > 0) {
        // Save previous time values
        setPrevTime(current => timeLeft)
        
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If we've reached the release date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    
    // Calculate immediately
    calculateTimeLeft()
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)
    
    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, []) // Remove timeLeft from dependencies
  
  // Check if each unit has changed
  const hasChanged = {
    days: prevTime.days !== timeLeft.days && prevTime.days !== 0,
    hours: prevTime.hours !== timeLeft.hours && prevTime.hours !== 0,
    minutes: prevTime.minutes !== timeLeft.minutes && prevTime.minutes !== 0,
    seconds: prevTime.seconds !== timeLeft.seconds && prevTime.seconds !== 0
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.backgroundGraphics}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
      
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
              src="/images/record.png" 
              alt="Vinyl record" 
              width={800} 
              height={800}
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
                <span className={styles.newMusic}>NEW MUSIC</span> RELEASING IN
              </h2>
              
              <div className={styles.countdown}>
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div className={`${styles.number} ${hasChanged.days ? styles.slideAnimation : ''}`}>
                      <span className={styles.numberCurrent}>{String(timeLeft.days).padStart(2, '0')}</span>
                      <span className={styles.numberNext}>{String(timeLeft.days).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className={styles.label}>DAYS</div>
                </div>
                
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div className={`${styles.number} ${hasChanged.hours ? styles.slideAnimation : ''}`}>
                      <span className={styles.numberCurrent}>{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className={styles.numberNext}>{String(timeLeft.hours).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className={styles.label}>HOURS</div>
                </div>
                
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div className={`${styles.number} ${hasChanged.minutes ? styles.slideAnimation : ''}`}>
                      <span className={styles.numberCurrent}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className={styles.numberNext}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className={styles.label}>MINUTES</div>
                </div>
                
                <div className={styles.timeUnit}>
                  <div className={styles.numberWrapper}>
                    <div className={`${styles.number} ${hasChanged.seconds ? styles.slideAnimation : ''}`}>
                      <span className={styles.numberCurrent}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className={styles.numberNext}>{String(timeLeft.seconds).padStart(2, '0')}</span>
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
            
            <div className={styles.releaseInfo}>
              <p>TITLE: ABC QWRT</p>
              <p>ARTISTS: WEEKEND, DAFT PUNK</p>
              <button className={styles.notifyButton}>GET NOTIFIED</button>
            </div>
            
            {/* Social share buttons removed as requested */}
          </div>
        </div>
      </div>
    </div>
  )
}
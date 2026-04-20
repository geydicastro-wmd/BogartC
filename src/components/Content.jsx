import { Container, Tabs, Tab, ButtonGroup, ToggleButton } from "react-bootstrap"
import { useState } from "react"

export default function HowToPlay() {

  const [tab, setTab] = useState("start")

  return (
    <Container className="text-center mb-5">

      {/* Toggle Buttons */}
      <ButtonGroup className="my-4">

        <ToggleButton
          id="start"
          type="radio"
          variant="warning"
          checked={tab === "start"}
          value="start"
          onChange={(e) => setTab(e.currentTarget.value)}
        >
          How to Start?
        </ToggleButton>

        <ToggleButton
          id="play"
          type="radio"
          variant="secondary"
          checked={tab === "play"}
          value="play"
          onChange={(e) => setTab(e.currentTarget.value)}
        >
          How to Play?
        </ToggleButton>

      </ButtonGroup>

      {/* CONTENT */}
      {tab === "start" && (

        <div className="rules px-5">

          <details open>
            <summary>
              1. Sign Up for an Account & Verify Your Account.
            </summary>

            <ol>
              <li>Click on "Sign Up."</li>
              <li>Enter your personal details.</li>
              <li>Check email for verification code.</li>
              <li>Enter code to activate your account.</li>
            </ol>

          </details>

          <details>
            <summary>
              2. Make Your First Deposit, Claim Your Welcome Bonus.
            </summary>

            <ol>
              <li>Log in and visit the cashier.</li>
              <li>Deposit using your preferred payment method.</li>
              <li>Contact our customer service department and claim your welcome bonus.</li>
            </ol>
          </details>

          <details>
            <summary>
              3. Explore the Game Selection & Start Playing.
            </summary>

            <ol>
              <li>Explore our selection of slots, table games, and live dealer options.</li>
              <li>Select a game to play for real money or try the demo version first.</li>
            </ol>

          </details>

        </div>
      )}

      {tab === "play" && (

        <div className="rules px-5">

          <details open>
            <summary>1. Choose a Game</summary>
            <p>
              Browse our catalog of slots, live casino games, and table games.
            </p>
          </details>

          <details>
            <summary>2. Place Your Bets</summary>
            <p>
              Select your bet amount and spin or play.
            </p>
          </details>

          <details>
            <summary>3. Spin or Deal</summary>
            <ul>
                <li>If you’re playing slots, click “Spin” to start the reels. In table games like blackjack or poker, hit “Deal” or follow the game’s instructions to begin.</li>
                <li>Enjoy the thrill of the game as you watch for winning combinations or successful hands.</li>
            </ul>
          </details>

          <details>
            <summary>4. Enjoy the Experience</summary>
            <p>
              With a wide variety of games and exciting bonuses, enjoy the entertainment and thrill of playing at Bogart Casino. Remember to gamble responsibly and have fun!
            </p>
          </details>

        </div>

      )}

    </Container>
  )
}



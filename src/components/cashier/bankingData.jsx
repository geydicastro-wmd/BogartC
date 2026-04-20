import BossRevolutionLogo from "../../assets/banking/BossRevolutionLogo.svg";
import CashappBitcoinLightning from "../../assets/banking/CashappBitcoinLightning.svg";
import ChecksLogo from "../../assets/banking/ChecksLogo.svg";
import CreditCardLogo from "../../assets/banking/CreditCardLogo.svg";
import CryptoMethodsLogos from "../../assets/banking/CryptoMethodsLogos.svg";
import CryptoUSDTBitcoin from "../../assets/banking/CryptoUSDTBitcoin.svg";
import KripayLogo from "../../assets/banking/KripayLogo.svg";
import P2PLogo from "../../assets/banking/P2PLogo.svg";

export const depositMethods = [
  {
    logo: CashappBitcoinLightning,
    title: "Send Bitcoin with Cash App",
    min: "20 USD",
    max: "5,000 USD",
    extra: "No transfer fees",
    description:["Experience effortless Bitcoin payments using Cash App and the Lightning Network. Simply open your Cash App, scan the QR code, and approve the transaction — fast, secure, and easy.", "\n \n", "For assistance or step-by-step guidance on depositing Bitcoin via Cash App, please contact our customer service team at", "\n \n",
    ],
    phone: "1-888-740-1896",
  },
  {
    logo: KripayLogo,
    title: "Apple Pay / Google Pay ",
    info: "Say goodbye to cash and cards! Apple Pay and Google Pay deliver seamless payments with ultimate convenience.",
    min: "20 USD",
    max: "20,000 USD",
    description:
      "For details on making a payment with Apple Pay or Google Pay please contact customer service at",
    phone: "1-888-740-1896",
  },
  {
    logo: CryptoMethodsLogos,
    title: "Bitcoin, Ethereum, Litecoin, Tether (USDT), USDC",
    min: "20 USD",
    max: "5,000 USD",
    description:
      "For details on sending a Bitcoin, Ethereum, Litecoin, Tether (USDT) or USDC transfer please contact customer service at",
    phone: "1-888-740-1896",
  },
  {
    logo: BossRevolutionLogo,
    title: "BossRevolution",
    info:
      [
        "There’s no place like a phone!", "\n \n",
    "Send money and reload securely from your mobile phone,", "\n \n",
    "Our international money transfer service is easy to use and provides you peace of mind.","\n \n",
    "The BOSS Revolution Money Transfer App is trusted by millions of customers every day to stay in touch, and send funds around the world."
  ],
    description: "For further details please contact customer service at:",
    phone: "1-888-740-1896",
  },
  {
    logo: P2PLogo,
    title: "P2P",
    info: "Fees incurred for sending funds will be reimbursed on deposits of $300 or more, in the form of free play credits.",
    min: "100 USD",
    max: "Upon Request",
    description:
      "For details on sending a larger person to person money transfer amount please contact customer service at",
    phone: "1-888-740-1896",
  },
  {
    logo: CreditCardLogo,
    title: "Credit Card",
    info: "Deposits made with Visa Card are subject to a 10 business day hold and documents including a signed authorization form, a copy of a valid photo ID, and copies of the front and back of the credit or debit card will be required.",
    min: "20 USD",
    max: "500 USD",
    description:
      "To make a deposit using your Credit Card / Debit Card please contact our customer service department at",
    phone: "1-888-740-1896",
  },
];


export const withdrawalMethods = [
  {
    logo: CryptoUSDTBitcoin,
    title: "USDT or Bitcoin",
    info: ["Withdrawals can be requested through the cashier using a new USDT or Bitcoin address.","\n \n","Please note that all requests are processed within 2 to 3 business days and are free of charge."],
    min: "100 USD",
    max: "4,000 USD every 7 days",
    description:
      "Contact customer service for further details at",
    phone: "1-888-740-1896",
  },
  {
    logo: P2PLogo,
    title: "P2P",
    info: ["Money Transfer payouts are processed Monday through Friday only. Processing times range from 24 to 72 hours.", "\n \n", "Processing times range from 24 to 72 hours."],
    min: "100 USD",
    max: "450 USD",
    bullets: [
    "Fees vary according to the amount requested, please contact our customer service staff for more details.","\n \n", 
    "3rd Withdrawal or more in a 7 day period is subject to additional fees.","\n \n", 
    "Based on the processor: 1 payment per player name every 5 days is allowed via this method.","\n \n", 
    "This method applies to the free payout every 30 days."
  ],
    description: "Contact customer service to submit your request at",
    phone: "1-888-740-1896",
  },
  {
    logo: ChecksLogo,
    title: "Checks",
    info: [
    "You may place your check withdrawal request Monday through Friday.","\n \n", 
    "Checks are processed on Tuesday and delivery takes 3 to 4 business days.","\n \n", 
    "A maximum of 1 check a week per account can be processed due to processor restrictions.","\n \n", 
    "This method applies for the free payout every 30 days."
  ],
    min: "1000 USD",
    max: "2,000 USD per week",
    bullets: [
    "Fees:","\n \n \n \n", 
    "Checks are sent in increments of 500 USD.","\n \n", 
    "Fees: $50 per check.","\n \n", 
    "Further restrictions may apply."
  ],
    description: "Contact customer service to submit your request at",
    phone: "1-888-740-1896",
  },
];
import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
// import { token_backend } from "../../../declarations/token_backend";

function Wallet() {
  // ---------- Header ----------
  const Header = () => (
    <header>
      <div className="blue window" id="logo">
        <h1>
          <span role="img" aria-label="tap emoji">💎</span>
          DSurv
        </h1>
      </div>
    </header>
  );

  // ---------- Balance ----------
  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleBalanceClick() {
    try {
      const principal = Principal.fromText(inputValue);
      const balance = await token_backend.balanceOf(principal);
      const tokenSymbol = await token_backend.getSymbol();
      setBalanceResult(balance.toLocaleString());
      setSymbol(tokenSymbol);
      setHidden(false);
    } catch (err) {
      console.error("Error checking balance:", err);
      setBalanceResult("Invalid Principal ID");
      setSymbol("");
      setHidden(false);
    }
  }

  // ---------- Faucet ----------
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleFaucetClick() {
    setDisabled(true);
    const result = await token_backend.payOut();
    setButtonText(result);
  }

  // ---------- Transfer ----------
  const [transferId, setTransferId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  async function handleTransferClick() {
    try {
      const recipient = Principal.fromText(transferId);
      const amount = Number(transferAmount);
      const result = await token_backend.transfer(recipient, amount);
      alert(result);
      setTransferId("");
      setTransferAmount("");
    } catch (err) {
      alert("Transfer failed. Make sure the Principal ID is valid.");
      console.error(err);
    }
  }

  return (
    <>
      <Header />

      {/* Faucet */}
      <div className="blue window">
        <h2>🚰 Faucet</h2>
        <label>Get your free DAngela tokens here! Claim 10,000 LKR coins to your account.</label>
        <p className="trade-buttons">
          <button
            className="btn-faucet"
            id="btn-payout"
            onClick={handleFaucetClick}
            disabled={isDisabled}
          >
            {buttonText}
          </button>
        </p>
      </div>

      {/* Balance */}
      <div className="window white">
        <label>Check account token balance:</label>
        <p>
          <input
            id="balance-principal-id"
            type="text"
            placeholder="Enter a Principal ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </p>
        <p className="trade-buttons">
          <button
            className="btn-check-balance"
            id="btn-request-balance"
            onClick={handleBalanceClick}
          >
            Check Balance
          </button>
        </p>
        <p hidden={isHidden}>
          This account has a balance of {balanceResult} {symbol}.
        </p>
      </div>

      {/* Transfer */}
      <div className="window white">
        <div className="transfer">
          <fieldset>
            <legend>To Account:</legend>
            <ul>
              <li>
                <input
                  type="text"
                  id="transfer-to-id"
                  value={transferId}
                  onChange={(e) => setTransferId(e.target.value)}
                />
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Amount:</legend>
            <ul>
              <li>
                <input
                  type="number"
                  id="amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </li>
            </ul>
          </fieldset>
          <p className="trade-buttons">
            <button
              className="btn-transfer"
              id="btn-transfer"
              onClick={handleTransferClick}
            >
              Transfer
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Wallet;

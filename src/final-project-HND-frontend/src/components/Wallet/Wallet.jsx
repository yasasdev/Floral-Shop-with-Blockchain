import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Coins, Send, RefreshCw, Copy, CheckCircle } from 'lucide-react';

const WalletComponent = () => {
  const [balance, setBalance] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [checkBalancePrincipal, setCheckBalancePrincipal] = useState('');
  const [queriedBalance, setQueriedBalance] = useState(null);
  const [copied, setCopied] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  
  // Ref to store the actual balance that updates in background
  const actualBalanceRef = useRef(0);
  const intervalRef = useRef(null);

  // 🔧 Mock token actor with internal balance state
  const mockTokenActor = (() => {
    const balances = {
      'rdmx6-jaaaa-aaaah-qcaiq-cai': 0 // mock principal
    };

    return {
      balanceOf: async (principal) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        // Return the actual balance from ref for the connected user
        if (principal === userPrincipal) {
          return actualBalanceRef.current;
        }
        return balances[principal] || 0;
      },
      getSymbol: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return 'LKR';
      },
      payOut: async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (!hasClaimed) {
          actualBalanceRef.current += 10000;
          return 'Payout successful';
        }
        return 'Already Claimed';
      }
    };
  })();

  // Background balance update effect
  useEffect(() => {
    if (isConnected) {
      // Start the background balance update
      intervalRef.current = setInterval(() => {
        actualBalanceRef.current += 10;
      }, 1000);

      return () => {
        // Cleanup interval when component unmounts or connection changes
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      // Clear interval if not connected
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPrincipal = 'rdmx6-jaaaa-aaaah-qcaiq-cai';
      setUserPrincipal(mockPrincipal);
      setIsConnected(true);
      showMessage('Wallet connected successfully!', 'success');
      await loadWalletData(mockPrincipal);
    } catch (error) {
      showMessage('Failed to connect wallet', 'error');
    }
    setLoading(false);
  };

  const loadWalletData = async (principal) => {
    setLoading(true);
    try {
      const tokenSymbol = await mockTokenActor.getSymbol();
      const currentBalance = await mockTokenActor.balanceOf(principal);
      setSymbol(tokenSymbol);
      setBalance(currentBalance);
      showMessage('Balance refreshed successfully!', 'success');
    } catch (error) {
      showMessage('Failed to load wallet data', 'error');
    }
    setLoading(false);
  };

  const handlePayOut = async () => {
    if (!isConnected) {
      showMessage('Please connect your wallet first', 'error');
      return;
    }

    if (hasClaimed) {
      showMessage('You have already claimed your payout.', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await mockTokenActor.payOut();

      if (result === 'Payout successful') {
        showMessage('Payout successful! You received 10,000 LKR', 'success');
        setHasClaimed(true);
        await loadWalletData(userPrincipal); // Refresh balance after payout
      } else {
        showMessage('Payout failed: Already claimed', 'error');
        setHasClaimed(true);
      }
    } catch (error) {
      showMessage('Transaction failed', 'error');
    }
    setLoading(false);
  };

  const checkBalance = async () => {
    if (!checkBalancePrincipal.trim()) {
      showMessage('Please enter a principal ID', 'error');
      return;
    }

    setLoading(true);
    try {
      const balance = await mockTokenActor.balanceOf(checkBalancePrincipal);
      setQueriedBalance(balance);
      showMessage(`Balance retrieved successfully`, 'success');
    } catch (error) {
      showMessage('Failed to check balance', 'error');
    }
    setLoading(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showMessage('Failed to copy to clipboard', 'error');
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat().format(balance);
  };

  const truncatePrincipal = (principal) => {
    if (!principal) return '';
    return `${principal.slice(0, 8)}...${principal.slice(-4)}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Wallet size={24} style={{ color: '#667eea' }} />
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#1a1a1a' }}>
              LKR Token Wallet
            </h1>
          </div>
          {isConnected && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }}></div>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>
                Connected
              </span>
            </div>
          )}
        </div>

        {message && (
          <div style={{
            margin: '16px 24px',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: messageType === 'success' ? '#dcfce7' : '#fee2e2',
            color: messageType === 'success' ? '#166534' : '#dc2626',
            border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
          }}>
            {messageType === 'success' && <CheckCircle size={16} />}
            {message}
          </div>
        )}

        {!isConnected ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Wallet size={48} style={{ color: '#9ca3af', marginBottom: '16px' }} />
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>
              Connect Your Wallet
            </h2>
            <p style={{ margin: '0 0 24px 0', color: '#6b7280', fontSize: '14px' }}>
              Connect your Internet Computer wallet to interact with LKR tokens
            </p>
            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                padding: '12px 24px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              onClick={connectWallet}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Wallet size={16} />
              )}
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
                Account Details
              </h3>
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                    Principal ID:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <code style={{
                      fontSize: '12px',
                      backgroundColor: '#e5e7eb',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      color: '#1a1a1a'
                    }}>
                      {truncatePrincipal(userPrincipal)}
                    </code>
                    <button 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        color: '#6b7280'
                      }}
                      onClick={() => copyToClipboard(userPrincipal)}
                      title="Copy full principal"
                    >
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Coins size={20} />
                  <span style={{ fontSize: '14px', opacity: 0.9 }}>Your Balance</span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>
                  {formatBalance(balance)} <span style={{ fontSize: '16px', opacity: 0.8 }}>LKR</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button 
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
                onClick={handlePayOut}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <Send size={16} />
                )}
                Claim Payout (10,000 LKR)
              </button>

              <button 
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
                onClick={() => loadWalletData(userPrincipal)}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <RefreshCw size={16} />
                )}
                Refresh Balance
              </button>
            </div>

            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}>
                Check Any Balance
              </h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Enter Principal ID to check balance"
                  value={checkBalancePrincipal}
                  onChange={(e) => setCheckBalancePrincipal(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button 
                  style={{
                    padding: '10px 16px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: (loading || !checkBalancePrincipal.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (loading || !checkBalancePrincipal.trim()) ? 0.5 : 1
                  }}
                  onClick={checkBalance}
                  disabled={loading || !checkBalancePrincipal.trim()}
                >
                  {loading ? <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Check'}
                </button>
              </div>
              {queriedBalance !== null && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0c4a6e'
                }}>
                  Balance: {formatBalance(queriedBalance)} LKR
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WalletComponent;
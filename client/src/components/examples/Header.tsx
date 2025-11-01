import { Header } from "../Header";

export default function HeaderExample() {
  return (
    <Header
      walletConnected={true}
      walletAddress="GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO"
      balance="12.5"
      onConnectWallet={() => console.log("Connect wallet clicked")}
      onDisconnect={() => console.log("Disconnect clicked")}
    />
  );
}

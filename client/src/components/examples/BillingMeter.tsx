import { BillingMeter } from "../BillingMeter";

export default function BillingMeterExample() {
  return (
    <div className="max-w-sm p-8">
      <BillingMeter
        balance={4.87}
        pricePerSecond={0.001}
        isStreaming={true}
        timeWatched={145}
        onTopUp={() => console.log("Top up clicked")}
      />
    </div>
  );
}

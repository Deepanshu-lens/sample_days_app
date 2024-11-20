// pages/index.js
import DateCalculator from "@/components/DateCalculator";

export const metadata = {
  title: "Days Calculator",
  description: "Calculating days between",
};

export default function Home() {
  return (
    <div>
      <DateCalculator />
    </div>
  );
}

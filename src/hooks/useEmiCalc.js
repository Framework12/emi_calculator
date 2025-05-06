export const useEMICalculator = () => {
  const calculateEMI = (principal, rate, tenure) => {
    try {
      const monthlyRate = rate / 12 / 100;
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
      return Number(emi.toFixed(2));
    } catch (error) {
      console.error("EMI calculation error:", error);
      return 0;
    }
  };

  const generateSchedule = (principal, rate, tenure, emi) => {
    try {
      const monthlyRate = rate / 12 / 100;
      let balance = principal;
      const schedule = [];

      for (let month = 1; month <= tenure; month++) {
        const interest = Number((balance * monthlyRate).toFixed(2));
        const principalPaid = Number((emi - interest).toFixed(2));
        balance = Number((balance - principalPaid).toFixed(2));

        schedule.push({
          month,
          payment: emi,
          principal: principalPaid,
          interest: interest,
          balance: Math.max(0, balance),
        });
      }

      return schedule;
    } catch (error) {
      console.error("Schedule generation error:", error);
      return [];
    }
  };

  return { calculateEMI, generateSchedule };
};

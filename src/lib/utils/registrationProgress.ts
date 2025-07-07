export const saveRegistrationProgress = async (
  screenName: string,
  data: unknown
): Promise<void> => {
  try {
    const key = `registration_progress_${screenName}`;
    console.log("🟠 Saving registration progress...");
    console.log("📦 Key:", key);
    console.log("📄 Data to save:", data);
    localStorage.setItem(key, JSON.stringify(data));
    console.log("✅ Progress saved successfully for screen:", screenName);
  } catch (error) {
    console.error("❌ Error saving registration progress:", error);
  }
};

export const getRegistrationProgress = async <T = unknown>(
  screenName: string
): Promise<T | null> => {
  try {
    const key = `registration_progress_${screenName}`;
    const data = localStorage.getItem(key);
    console.log("📥 Retrieving progress for key:", key);
    if (data !== null) {
      console.log("✅ Data retrieved:", JSON.parse(data));
    } else {
      console.log("⚠️ No data found for key:", key);
    }
    return data !== null ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error("❌ Error retrieving registration progress:", error);
    return null;
  }
};

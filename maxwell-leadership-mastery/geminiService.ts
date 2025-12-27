
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getMaxwellCoaching = async (mistake: string, principle: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là John Maxwell, chuyên gia lãnh đạo hàng đầu thế giới. 
      Một nhà lãnh đạo đang gặp sai lầm: "${mistake}". 
      Giải pháp đề xuất theo nguyên lý của bạn là: "${principle}".
      
      Hãy cung cấp:
      1. Một lời khuyên ngắn gọn, sâu sắc (1-2 câu).
      2. 3 hành động cụ thể (Actionable steps) để áp dụng ngay ngày mai.
      3. Một câu trích dẫn truyền cảm hứng phù hợp.
      
      Hãy trả lời bằng tiếng Việt, giọng văn chuyên nghiệp, khích lệ và uy quyền.`,
    });
    return response.text || "Xin lỗi, tôi không thể đưa ra lời khuyên vào lúc này.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Đã có lỗi xảy ra khi kết nối với Maxwell AI. Vui lòng thử lại sau.";
  }
};

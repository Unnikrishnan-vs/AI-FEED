const { provideGuidanceViaChatbot } = require('./src/ai/flows/provide-guidance-via-chatbot.ts');
const { matchFoodSupplyAndDemand } = require('./src/ai/flows/match-food-supply-and-demand.ts');

async function testAI() {
  console.log('🧪 Testing AI-FEED AI Server...\n');

  // Test 1: Chatbot
  console.log('1. Testing Chatbot...');
  try {
    const chatbotResponse = await provideGuidanceViaChatbot({
      message: 'How do I donate food?'
    });
    console.log('✅ Chatbot Response:', chatbotResponse.response);
  } catch (error) {
    console.log('❌ Chatbot Error:', error.message);
  }

  console.log('\n2. Testing Food Matching...');
  try {
    const matchResponse = await matchFoodSupplyAndDemand({
      foodType: 'Cooked Meals',
      quantity: 50,
      donorLatitude: 19.076,
      donorLongitude: 72.8777,
      recipientNeed: 'meals for 60 people',
      recipientLatitude: 19.075,
      recipientLongitude: 72.87,
    });
    console.log('✅ Match Response:', matchResponse.match);
  } catch (error) {
    console.log('❌ Match Error:', error.message);
  }

  console.log('\n🎉 AI Server Test Complete!');
}

testAI(); 
import { chromium, devices } from 'playwright';
import assert from 'node:assert';
import Browser from "./browsers.json" with { type: "json" };

function getRandomArbitrary() {
  let min = 250
  let max = 19000
  return Math.random() * (max - min) + min;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function voter() {
  // Setup
  const browser = await chromium.launch({
    headless: false
  });
  const browserString = Browser[Math.floor(Math.random() * Browser.length)]
  const context = await browser.newContext(devices[`${browserString}`]);
  console.log(`Loaded ${browserString}`)
  const page = await context.newPage();

  await page.goto('https://matchmypolicy.net/policies');

//   assert(await page.title() === 'Example Domain'); // 👎 not a Web First assertion

await sleep(getRandomArbitrary())
await page.getByLabel("অসম্মত",{exact: true}).click()

let shouldStop = false;

page.on('request', (request) => { 
    // console.log('>>', request.method(), request.url())

    if(request.url() == "https://sqrguxsygbdcdarvgesn.supabase.co/storage/v1/object/public/ALL/updated%20logo.webp"){
        console.log("All Completed")
        console.log("Dhaaner shish gone")
        shouldStop = true;
    }

});

while(!shouldStop){
    await sleep(getRandomArbitrary())
    if(shouldStop) break;
    try {
        await page.getByLabel("অসম্মত",{exact: true}).click({timeout: 11000})
    } catch(e) {
        if(shouldStop) break;
    }
}

await page.close()
await browser.close()

console.log("Page loaded")
};

async function main(){
    for(let i = 0;i<100;i++){
        await sleep(getRandomArbitrary())
        await voter()
    }
}

main()
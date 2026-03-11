exports.handler = async function(event){

const apiKey = process.env.GEMINI_API_KEY
const body = JSON.parse(event.body)

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+apiKey,
{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
contents:[{parts:[{text:body.prompt}]}]
})
}
)

const data = await response.json()

let text=""
try{
text=data.candidates[0].content.parts[0].text
}catch{
text="No AI response"
}

return{
statusCode:200,
body:JSON.stringify({text})
}

}

const mood = document.getElementById("mood");
const button = document.getElementById("generateBtn");
const prompt = document.getElementById("prompt");

button.addEventListener("click", async () => {

    if (mood.value === "") {
        prompt.textContent = "Please enter your mood.";
        return;
    }

    prompt.textContent = "Generating...";

    try {

        const response = await fetch("/journal-prompt", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                mood: mood.value
            })
        });

        const data = await response.json();

        prompt.textContent = data.prompt;

    } catch (error) {

        console.log(error);
        prompt.textContent = "Something went wrong.";

    }
});
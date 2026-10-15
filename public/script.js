const aiForm = document.getElementById('aiForm');
const questionInput = document.getElementById('questionInput');
const submitBtn = document.getElementById('submitBtn');
const answerContainer = document.getElementById('answerContainer');
const answerText = document.getElementById('answerText');

aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = questionInput.value.trim();
    if (!question) return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Loading...';
    answerContainer.classList.remove('hidden');
    answerText.innerText = 'Thinking...';

    try {
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();

        if (response.ok) {
            answerText.innerText = data.answer;
        } else {
            answerText.innerText = data.error || 'Something went wrong.';
        }
    } catch (error) {
        console.error('Error:', error);
        answerText.innerText = 'Server connection error.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Ask';
    }
});
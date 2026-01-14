const authForm = document.querySelector('.js-auth-form')
if (authForm) {
    authForm.addEventListener('submit', event => {
        event.preventDefault()

        const form = new FormData(authForm)
        const data = Object.fromEntries(form.entries())

        const res = fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include'
        })

        res.then(res => res.json()).then(user => {
            location.reload()
        })
    })
}

document.querySelector('.js-auth')?.addEventListener('click', async () => {
    await fetch('/api/v1/users/logout', { method: 'POST' });
    location.reload();
});
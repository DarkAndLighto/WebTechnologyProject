window.addEventListener('load', function() {
    document.querySelector('iframe').style.display = 'none';
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
});

function ActivatePopOver()
{
}
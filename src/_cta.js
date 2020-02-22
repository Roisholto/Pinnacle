var closeFn
function closeShowingModal () {
  var showingModal = document.querySelector('.cta-modal.show')
  if (!showingModal) return
  showingModal.classList.remove('show')
  document.body.classList.remove('disable-mouse')
  document.body.classList.remove('disable-scroll')
  if (closeFn) {
    closeFn()
    closeFn = null
  }
}
document.addEventListener('click', function (e) {
  var target = e.target
  if (target.dataset.ctaTarget) {
    closeFn = cta(target, document.querySelector(target.dataset.ctaTarget), { relativeToWindow: true }, function showModal (modal) {
      modal.classList.add('show')
      document.body.classList.add('disable-mouse')
      if (target.dataset.disableScroll) {
        document.body.classList.add('disable-scroll')
      }
    })
  } else if (target.classList.contains('cta-modal-close-btn') || target.classList.contains('cta-modal-close')) {
    closeShowingModal()
  }
})
document.addEventListener('keyup', function (e) {
  if (e.which === 27) {
    closeShowingModal()
  }
})

const STORAGE_KEY = 'sn-intro-seen'

/** Plays the loading introduction once per browser session. */
export function useSessionIntro() {
  const showIntro = useState('intro-visible', () => false)
  const introDone = useState('intro-done', () => false)

  onMounted(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        showIntro.value = true
      } else {
        introDone.value = true
      }
    } catch {
      introDone.value = true
    }
  })

  function finishIntro() {
    showIntro.value = false
    introDone.value = true
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* storage unavailable — intro simply plays again next visit */
    }
  }

  return { showIntro, introDone, finishIntro }
}

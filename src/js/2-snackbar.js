document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delayInput = form.elements.delay;
    const delayValue = delayInput.value.trim();
    const stateValue = form.elements.state.value;

    if (!delayValue) {
      iziToast.warning({
        title: 'Caution',
        message: 'You forgot important data',
        position: 'topRight',
        backgroundColor: '#ffa000',
        titleColor: '#fff',
        messageColor: '#fff',
        iconUrl: './img/caution-icon.svg',
      });
      delayInput.focus();
      return;
    }

    if (!stateValue) {
      iziToast.warning({
        title: 'Caution',
        message: 'You forgot important data',
        position: 'topRight',
        backgroundColor: '#ffa000',
        titleColor: '#fff',
        messageColor: '#fff',
        iconUrl: './img/caution-icon.svg',
      });
      return;
    }

    const delay = Number(delayValue);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stateValue === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    })
      .then(delay => {
        iziToast.success({
          title: 'OK',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          titleColor: '#fff',
          messageColor: '#fff',
          iconUrl: './img/success-icon.svg',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `Illegal operation`,
          position: 'topRight',
          backgroundColor: '#ef4040',
          titleColor: '#fff',
          messageColor: '#fff',
          iconUrl: './img/error-icon.svg',
        });
      });
  });
});
const priceSlider = document.querySelector('.price-slider');
  const rangeInputs = document.querySelectorAll('.range-input input');
  const numberInputs = {
    min: document.querySelector('.min-input'),
    max: document.querySelector('.max-input')
  };
  const priceGap = 500;

  function updateSliderFill(minVal, maxVal) {
    const maxRange = parseInt(rangeInputs[1].max, 10);
    priceSlider.style.left  = (minVal / maxRange) * 100 + '%';
    priceSlider.style.right = 100 - (maxVal / maxRange) * 100 + '%';
  }

  function onRangeInput(e) {
    let minVal = parseInt(rangeInputs[0].value, 10);
    let maxVal = parseInt(rangeInputs[1].value, 10);
    if (maxVal - minVal < priceGap) {
      if (e.target.classList.contains('min-range')) {
        minVal = maxVal - priceGap;
        rangeInputs[0].value = minVal;
      } else {
        maxVal = minVal + priceGap;
        rangeInputs[1].value = maxVal;
      }
    }
    numberInputs.min.value = minVal;
    numberInputs.max.value = maxVal;
    updateSliderFill(minVal, maxVal);
  }

  function onNumberInput(e) {
    let minVal = parseInt(numberInputs.min.value, 10);
    let maxVal = parseInt(numberInputs.max.value, 10);
    const rangeMax = parseInt(rangeInputs[1].max, 10);

    if (isNaN(minVal)) minVal = 0;
    if (isNaN(maxVal)) maxVal = rangeMax;
    if (minVal < 0) minVal = 0;
    if (maxVal > rangeMax) maxVal = rangeMax;

    if (maxVal - minVal < priceGap) {
      if (e.target === numberInputs.min) {
        minVal = maxVal - priceGap;
        numberInputs.min.value = minVal;
      } else {
        maxVal = minVal + priceGap;
        numberInputs.max.value = maxVal;
      }
    }
    rangeInputs[0].value = minVal;
    rangeInputs[1].value = maxVal;
    updateSliderFill(minVal, maxVal);
  }

  rangeInputs.forEach(r => r.addEventListener('input', onRangeInput));
  numberInputs.min.addEventListener('input', onNumberInput);
  numberInputs.max.addEventListener('input', onNumberInput);

  // initialize
  updateSliderFill(parseInt(rangeInputs[0].value, 10), parseInt(rangeInputs[1].value, 10));
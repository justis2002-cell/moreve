/* ===== INTRO VIDEO ===== */
const introVideo = document.getElementById('introVideo');
const introMovie = document.getElementById('introMovie');
const introEnter = document.getElementById('introEnter');
const hasSeenIntro = sessionStorage.getItem('seenIntro');

if (introVideo && introMovie) {
  if (hasSeenIntro) {
    // 이미 봤으면 즉시 제거
    introVideo.style.display = 'none';
    document.body.classList.add('intro-done');  // ← 추가 (영상 안 봐도 애니메이션 재생)
  } else {
    // 처음 방문 시에만 인트로 실행
    document.body.classList.add('intro-active');
    sessionStorage.setItem('seenIntro', 'true');

    function hideIntro() {
      introVideo.classList.add('hide');
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-done');  // ← 추가

      setTimeout(() => {
        introVideo.style.display = 'none';
      }, 1000);
    }

    // 영상이 끝나면 자동으로 사라짐
    introMovie.addEventListener('ended', hideIntro);

    // ENTER MOREVE 버튼 누르면 바로 사라짐
    introEnter?.addEventListener('click', hideIntro);

    // 혹시 영상 로딩/재생 문제가 생기면 8초 후 자동으로 사라지게 안전장치
    setTimeout(() => {
      if (!introVideo.classList.contains('hide')) {
        hideIntro();
      }
    }, 8000);
  }
}
/* ===========================================
   MOREVE - Main Script
   =========================================== */


/* ===== 1. 히어로 슬라이드 자동 전환 ===== */
const slides = document.querySelectorAll('.slide');
let current = 0;

function nextSlide() {
  if (!slides.length) return;

  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

if (slides.length) {
  setInterval(nextSlide, 4000);
}


/* ===== 2. 상품 데이터 ===== */
const productData = {
  pi1: { category: 'OUTER', name: '롱 트렌치 코트', price: 189000 },
  pi2: { category: 'OUTER', name: '숏 울 자켓', price: 258000 },
  pi3: { category: 'TOP', name: '코튼 셔츠 블라우스', price: 68000 },
  pi4: { category: 'TOP', name: '케이블 니트 풀오버', price: 98000 },
  pi5: { category: 'DRESS', name: '린넨 셔츠 원피스', price: 142000 },
  pi6: { category: 'DRESS', name: '플리츠 미디 원피스', price: 158000 },
  pi7: { category: 'BOTTOM', name: '와이드 슬랙스', price: 92000 },
  pi8: { category: 'BOTTOM', name: '데님 스트레이트 팬츠', price: 88000 },
  pi9: { category: 'OUTER', name: '싱글 트렌치 코트', price: 178000 },
  pi10: { category: 'OUTER', name: '린넨 블레이저', price: 158000 },
  pi11: { category: 'TOP', name: '실크 블라우스', price: 112000 },
  pi12: { category: 'TOP', name: '스트라이프 셔츠', price: 78000 },
  pi13: { category: 'DRESS', name: '슬립 미디 원피스', price: 128000 },
  pi14: { category: 'DRESS', name: '셔츠 원피스', price: 138000 },
  pi15: { category: 'BOTTOM', name: '코튼 와이드 팬츠', price: 88000 },
  pi16: { category: 'BOTTOM', name: 'A라인 미디 스커트', price: 78000 },
  pi17: { category: 'OUTER', name: '더블 자켓 셋업', price: 228000 },
  pi18: { category: 'OUTER', name: '체크 블레이저', price: 168000 },
  pi19: { category: 'TOP', name: '카라 셔츠 블라우스', price: 78000 },
  pi20: { category: 'TOP', name: '벨티드 점프수트', price: 148000 },
  pi21: { category: 'DRESS', name: '셔링 롱 원피스', price: 158000 },
  pi22: { category: 'DRESS', name: '플로럴 미디 원피스', price: 128000 },
  pi23: { category: 'BOTTOM', name: '플리츠 롱 스커트', price: 98000 },
  pi24: { category: 'BOTTOM', name: '벨티드 미디 스커트', price: 88000 }
};


/* ===== 3. 상품 클릭 시 해당 상품 상세페이지로 이동 ===== */
document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('click', (e) => {
    e.preventDefault();

    const imgBox = product.querySelector('.product-img');
    if (!imgBox) return;

    const productId = [...imgBox.classList].find(cls => cls.startsWith('pi'));

    if (productId) {
      window.location.href = `product.html?id=${productId}`;
    }
  });
});


/* ===== 4. 스크롤 시 헤더 그림자 효과 ===== */
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}


/* ===== 5. 상품 상세페이지 정보 변경 ===== */
const params = new URLSearchParams(window.location.search);
const productId = params.get('id') || 'pi1';
const selected = productData[productId];

const pdCat = document.querySelector('.pd-cat');
const pdName = document.querySelector('.pd-name');
const pdPrice = document.querySelector('.pd-price');
const pdMainImg = document.querySelector('.pd-main-img');
const pdThumbs = document.querySelectorAll('.pd-thumb');

const qtyNum = document.getElementById('qtyNum');
const totalPrice = document.getElementById('totalPrice');
const cartCount = document.getElementById('cartCount');

let unitPrice = selected ? selected.price : 189000;
let qty = 1;

if (selected && pdName) {
  if (pdCat) pdCat.textContent = selected.category;
  if (pdName) pdName.textContent = selected.name;
  if (pdPrice) pdPrice.innerHTML = `${selected.price.toLocaleString()}<span>원</span>`;
  if (pdMainImg) pdMainImg.className = `pd-main-img ${productId}`;
  if (totalPrice) totalPrice.textContent = selected.price.toLocaleString();

  pdThumbs.forEach((thumb, index) => {
    thumb.className = `pd-thumb ${productId}`;
    if (index === 0) thumb.classList.add('active');
  });
}


/* ===== 6. 상품 상세 수량 계산 ===== */
if (qtyNum) {
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');

  qtyMinus?.addEventListener('click', () => {
    if (qty > 1) qty--;

    qtyNum.textContent = qty;

    if (totalPrice) {
      totalPrice.textContent = (unitPrice * qty).toLocaleString();
    }
  });

  qtyPlus?.addEventListener('click', () => {
    qty++;

    qtyNum.textContent = qty;

    if (totalPrice) {
      totalPrice.textContent = (unitPrice * qty).toLocaleString();
    }
  });
}


/* ===== 7. 컬러 선택 ===== */
document.querySelectorAll('.pd-color').forEach(color => {
  color.addEventListener('click', () => {
    document.querySelectorAll('.pd-color').forEach(item => item.classList.remove('active'));
    color.classList.add('active');
  });
});


/* ===== 8. 사이즈 선택 ===== */
document.querySelectorAll('.pd-size').forEach(size => {
  size.addEventListener('click', () => {
    document.querySelectorAll('.pd-size').forEach(item => item.classList.remove('active'));
    size.classList.add('active');
  });
});


/* ===== 9. 썸네일 클릭 ===== */
document.querySelectorAll('.pd-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.pd-thumb').forEach(item => item.classList.remove('active'));
    thumb.classList.add('active');

    const thumbImgClass = [...thumb.classList].find(cls => cls.startsWith('pi'));

    if (pdMainImg && thumbImgClass) {
      pdMainImg.className = `pd-main-img ${thumbImgClass}`;
    }
  });
});


/* ===== 10. 장바구니 담기 ===== */
const addCart = document.getElementById('addCart');

if (addCart) {
  addCart.addEventListener('click', () => {
    let count = parseInt(localStorage.getItem('cartCount') || '0');
    count += qty;

    localStorage.setItem('cartCount', count);

    document.querySelectorAll('.cart .num').forEach(num => {
      num.textContent = count;
    });

    alert('장바구니에 담겼습니다.');
  });
}


/* ===== 11. 모든 페이지에서 장바구니 숫자 표시 ===== */
const savedCount = localStorage.getItem('cartCount');

if (savedCount) {
  document.querySelectorAll('.cart .num').forEach(num => {
    num.textContent = savedCount;
  });
}


/* ===== 12. 카테고리 상품 개수 자동 계산 ===== */
const catCount = document.querySelector('.cat-count span');
const catProducts = document.querySelectorAll('.cat-products .product');

if (catCount && catProducts.length) {
  catCount.textContent = catProducts.length;
}
// 스크롤 페이드인 (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => fadeObserver.observe(el));

// 자체제작 배너 스크롤 애니메이션
const proposalSection = document.querySelector('.proposal');
if (proposalSection) {
  const proposalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        proposalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  proposalObserver.observe(proposalSection);
}

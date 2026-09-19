// ============================================
// KartHub — Rating Stars Component
// ============================================

let starIdCounter = 0;

export function renderStars(rating, size = 14) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  let html = '<span class="stars">';
  for (let i = 0; i < fullStars; i++) {
    html += `<svg class="star" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  if (hasHalf) {
    const uid = `half-star-${++starIdCounter}`;
    html += `<svg class="star" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="${uid}"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#D5D9D9"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#${uid})"/></svg>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    html += `<svg class="star empty" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  html += '</span>';
  return html;
}

export function renderRatingBadge(rating) {
  const color = rating >= 4 ? '#067D62' : rating >= 3 ? '#F5A623' : '#CC0C39';
  return `<span class="rating-badge" style="background:${color}">★ ${rating}</span>`;
}

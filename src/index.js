import { fetchNews } from './scripts/news';
import { fetchWorkImages } from './scripts/works';
import { fetchContact } from './scripts/contact';

if (location.pathname === '/news.html') {
  fetchNews();
} else if (['/portrait.html', '/flower.html', '/processing.html'].includes(location.pathname)) {
  fetchWorkImages();
} else if (location.pathname === '/contact.html') {
  fetchContact();
}

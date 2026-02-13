import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { usePageMeta } from './hooks/usePageMeta';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import CreateStudioPage from './pages/CreateStudioPage';
import TemplatesPage from './pages/TemplatesPage';
import MarketplacePage from './pages/MarketplacePage';
import PublishPage from './pages/PublishPage';
import CreatorsPage from './pages/CreatorsPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import BillingPage from './pages/BillingPage';
import SupportPage from './pages/SupportPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LegalPrivacyPage from './pages/LegalPrivacyPage';
import LegalTermsPage from './pages/LegalTermsPage';
import LegalRefundPage from './pages/LegalRefundPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateStudioPage,
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/templates',
  component: TemplatesPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: MarketplacePage,
});

const publishRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/publish',
  component: PublishPage,
});

const creatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creators',
  component: CreatorsPage,
});

const creatorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/creator/$username',
  component: CreatorProfilePage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/billing',
  component: BillingPage,
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: SupportPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FaqPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: LegalPrivacyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: LegalTermsPage,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund',
  component: LegalRefundPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  createRoute_,
  templatesRoute,
  marketplaceRoute,
  publishRoute,
  creatorsRoute,
  creatorProfileRoute,
  pricingRoute,
  dashboardRoute,
  billingRoute,
  supportRoute,
  faqRoute,
  blogRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  adminRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

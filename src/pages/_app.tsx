import { useAnalytics } from "@hooks/useAnalytics"
import { Footer, Header } from '@components/shared';
import '../styles/globals.scss';
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	const { analyticsLogEvent } = useAnalytics();
	const router = useRouter()

	useEffect(() => {
    const handleRouteChange = (url: string) => {
      analyticsLogEvent({
				eventType: "page_view",
				eventParam: {
					page_location: url,
				}
			});
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
		<>
			<Header />
    	<Component {...pageProps} />
			<Footer />
		</>
  );
}

export default MyApp;

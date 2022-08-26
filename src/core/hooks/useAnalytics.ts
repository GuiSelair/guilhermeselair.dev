import {
	logEvent,
	getAnalytics,
	Analytics,
	EventNameString,
	EventParams,
	CustomEventName,
} from "firebase/analytics";
import { useCallback, useEffect, useState } from "react";

import { app } from "@services/firebase";

interface IAnalyticsLogEvent {
	eventType: string;
	eventParam?: EventParams;
}

export function useAnalytics() {
	const [analytics, setAnalytics] = useState<Analytics>();

	useEffect(() => {
		setAnalytics(getAnalytics(app));
	}, []);

	const analyticsLogEvent = useCallback(({ eventType, eventParam = {} }: IAnalyticsLogEvent): void => {
		if (!analytics) return;
		logEvent(analytics, eventType, eventParam);
	}, []);

	return {
		analyticsLogEvent,
		analytics
	};
}

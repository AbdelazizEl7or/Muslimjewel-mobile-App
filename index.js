import { registerRootComponent } from "expo";
import App from "./App";
import { registerWidgetTaskHandler } from "react-native-android-widget";
import { widgetTaskHandler } from "./widget-task-handler";

registerRootComponent(App);

registerWidgetTaskHandler(widgetTaskHandler);

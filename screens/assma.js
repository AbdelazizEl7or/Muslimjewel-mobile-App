import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Text, Card, useTheme, Input } from "@ui-kitten/components";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { serial } from "../utils";
export const assma = [
  {
    id: 1,
    name: "اللَّهُ",
    text: "وهو الاسم الأعظم الذي تفرد به الحق سبحانه وخص به نفسه وجعله أول أسمائه، وأضافها كلها إليه فهو علم على ذاته سبحانه",
  },
  {
    id: 2,
    name: "الرَّحْمَنُ",
    text: "كثير الرحمة وهو اسم مقصور على الله عز وجل ولا يجوز أن يقال رحمن لغير الله، وذلك لأن رحمته وسعت كل شيء وهو أرحم الراحمين",
  },
  {
    id: 3,
    name: "الرَّحِيم",
    text: "هو المنعم أبدا، المتفضل دوما، فرحمته لا تنتهي",
  },
  {
    id: 4,
    name: "المَلِك",
    text: "هو الله، ملك الملوك، له الملك، وهو مالك يوم الدين، ومليك الخلق فهو المالك المطلق",
  },
  {
    id: 5,
    name: "الْقُدُّوس",
    text: "هو الطاهر المنزه عن العيوب والنقائص وعن كل ما تحيط به العقول",
  },
  {
    id: 6,
    name: "السَّلَام",
    text: "هو ناشر السلام بين الأنام وهو الذي سلمت ذاته من النقص والعيب والفناء",
  },
  {
    id: 7,
    name: "المُؤْمِن",
    text: "هو الذي سلم أوليائه من عذابه، والذي يصدق عباده ما وعدهم",
  },
  {
    id: 8,
    name: "الْمُهَيْمِن",
    text: "هو الرقيب الحافظ لكل شيء، القائم على خلقه بأعمالهم، وأرزاقهم وآجالهم، والمطلع على خفايا الأمور وخبايا الصدور",
  },
  {
    id: 9,
    name: "الْعَزِيز",
    text: "هو المنفرد بالعزة، الظاهر الذي لا يقهر، القوي الممتنع فلا يغلبه شيء وهو غالب كل شيء",
  },
  {
    id: 10,
    name: "الْجَبَّار",
    text: "هو الذي تنفذ مشيئته، ولا يخرج أحد عن تقديره، وهو القاهر لخلقه على ما أراد",
  },
  {
    id: 11,
    name: "الْمُتَكَبِّر",
    text: "هو المتعالى عن صفات الخلق المنفرد بالعظمة والكبرياء",
  },
  {
    id: 12,
    name: "الْخَالِق",
    text: "هو الفاطر المبدع لكل شيء، والمقدر له والموجد للأشياء من العدم، فهو خالق كل صانع وصنعته",
  },
  {
    id: 13,
    name: "الْبَارِئ",
    text: "هو الذي خلق الخلق بقدرته لا عن مثال سابق، القادر على إبراز ما قدره إلى الوجود",
  },
  {
    id: 14,
    name: "الْمُصَوِّر",
    text: "هو الذي صور جميع الموجودات، ورتبها فأعطى كل شيء منها صورة خاصة، وهيئة منفردة، يتميز بها على اختلافها وكثرتها",
  },
  {
    id: 15,
    name: "اَلْغَفَّار",
    text: "هو وحده الذي يغفر الذنوب ويستر العيوب في الدنيا والآخرة",
  },
  {
    id: 16,
    name: "الْقَهَّار",
    text: "هو الغالب الذي قهر خلقه بسلطانه وقدرته، وخضعت له الرقاب وذلت له الجبابرة، وصرف خلقه على ما أراد طوعا وكرها، وعنت الوجوه له",
  },
  {
    id: 17,
    name: "الْوَهَّاب",
    text: "هو المنعم على العباد، الذي يهب بغير عوض ويعطي الحاجة بغير سؤال، كثير النعم، دائم العطاء",
  },
  {
    id: 18,
    name: "الرَّزَّاق",
    text: "هو الذي خلق الأرزاق وأعطى كل الخلائق أرزاقها، ويمد كل كائن لما يحتاجه، ويحفظ عليه حياته ويصلحه",
  },
  {
    id: 19,
    name: "الْفَتَّاح",
    text: "هو الذي يفتح مغلق الأمور، ويسهل العسير، وبيده مفاتيح السماوات والأرض",
  },
  {
    id: 20,
    name: "الْعَلِيم",
    text: "هو الذي يعلم تفاصيل الأمور، ودقائق الأشياء وخفايا الضمائر، والنفوس، لا يعزب عنه مثقال ذرة، فعلمه يحيط بجميع الأشياء",
  },
  {
    id: 21,
    name: "الْقَابِضُ",
    text: "هو الذي يقبض الرزق عمن يشاء من الخلق بعدله وحكمته، والذي يوسع الرزق لمن يشاء من عباده بجوده ورحمته فهو سبحانه القابض الباسط",
  },
  {
    id: 22,
    name: "الْبَاسِطُ",
    text: "هو الذي يقبض الرزق عمن يشاء من الخلق بعدله وحكمته، والذي يوسع الرزق لمن يشاء من عباده بجوده ورحمته فهو سبحانه القابض الباسط",
  },
  {
    id: 23,
    name: "الخافض",
    text: "هو الذي يخفض الأذلال لكل من طغى وتجبر وخرج على شريعته وتمرد، وهو الذي يرفع عباده المؤمنين بالطاعات ويرفعهم على عدوهم فينصرهم وهو رافع السماوات السبع",
  },
  {
    id: 24,
    name: "الرَّافِعُ",
    text: "هو الذي يخفض الأذلال لكل من طغى وتجبر وخرج على شريعته وتمرد، وهو الذي يرفع عباده المؤمنين بالطاعات ويرفعهم على عدوهم فينصرهم وهو رافع السماوات السبع",
  },
  {
    id: 25,
    name: "المعز",
    text: "هو الذي يهب القوة والغلبة والشدة لمن شاء فيعزه، وينزعها عمن يشاء فيذله",
  },
  {
    id: 26,
    name: "المذل",
    text: "هو الذي يهب القوة والغلبة والشدة لمن شاء فيعزه، وينزعها عمن يشاء فيذله",
  },
  {
    id: 27,
    name: "السَّمِيعُ",
    text: "ومعناه سمعه لجميع الأصوات الظاهرة والباطنة الخفية والجلية، وإحاطته التامة بها، ومعناه أيضًا: سمع الإجابة منه للسائلين والداعين والعابدين فيجيبهم ويثيبهم",
  },
  {
    id: 28,
    name: "الْبَصِير",
    text: "هو الذي يرى الأشياء كلها ظاهرها وباطنها وهو المحيط بكل شيء علماً",
  },
  {
    id: 29,
    name: "الْحَكَم",
    text: "هو الذي يفصل بين مخلوقاته بما شاء ويفصل بين الحق والباطل لا راد لقضائه ولا معقب لحكمه",
  },
  {
    id: 30,
    name: "العدل",
    text: "هو الذي حرم الظلم على نفسه، وجعله على عباده محرما، فهو المنزه عن الظلم والجور في أحكامه وأفعاله الذي يعطي كل ذي حق حقه",
  },
  {
    id: 31,
    name: "اللَّطِيفُ",
    text: "هو البر الرفيق بعباده، يرزق وييسر ويحسن إليهم، ويرفق بهم ويتفضل عليهم",
  },
  {
    id: 32,
    name: "الْخَبِيرُ",
    text: "هو العليم بدقائق الأمور، لا تخفى عليه خافية، ولا يغيب عن علمه شيء فهو العالم بما كان ويكون",
  },
  {
    id: 33,
    name: "الْحَلِيمُ",
    text: "هو الصبور الذي يمهل ولا يهمل، ويستر الذنوب، ويؤخر العقوبة، فيرزق العاصي كما يرزق المطيع",
  },
  {
    id: 34,
    name: "الْعَظِيمُ",
    text: "هو العظيم في كل شئ، عظيم في ذاته وأسمائه وصفاته، عظيم في رحمته، عظيم في قدرته، عظيم في حكمته، عظيم في جبروته وكبريائه، عظيم في هبته وعطائه، عظيم في خبرته ولطفه، عظيم في بره وإحسانه، عظيم في عزته وعدله وحمده، فهو العظيم المطلق، فلا أحد يساويه",
  },
  {
    id: 35,
    name: "الْغَفُورُ",
    text: "هو الساتر لذنوب عباده المتجاوز عن خطاياهم وذنوبهم. الفرق بين هذا الاسم واسم الغفار أن اسم الغفور يكون للدلالة على مغفرة الذنب مهما عظم وأيس صاحبه من المغفرة أما الغفار فتدل على مغفرة الله المستمرة للذنوب المختلفة لأن الإنسان خطاء فالله غفار",
  },
  {
    id: 36,
    name: "الشَّكُورُ",
    text: "هو الذي يزكو عنده القليل من أعمال العباد، فيتقبلها ويضاعف أجرها",
  },
  {
    id: 37,
    name: "الْعَلِيُّ",
    text: "هو الرفيع القدر فلا يحيط به وصف الواصفين المتعالي عن الأنداد والأضداد، فكل معاني العلو ثابتة له ذاتا وقهرا وشأنا",
  },
  {
    id: 38,
    name: "الْكَبِيرُ",
    text: "هو العظيم الجليل ذو الكبرياء في صفاته وأفعاله فلا يحتاج إلى شيء ولا يعجزه شيء (ليس كمثله شيء)",
  },
  {
    id: 39,
    name: "الْحَفِيظُ",
    text: "هو الذي لا يغرب عن حفظه شيء ولو كمثقال الذر فحفظه لا يتبدل ولا يزول ولا يعتريه التبديل",
  },
  {
    id: 40,
    name: "المُقِيت",
    text: "هو المتكفل بإيصال أقوات الخلق إليهم وهو الحفيظ والمقتدر والقدير والمقدر والممدد",
  },
  {
    id: 41,
    name: "الْحَسِيبُ",
    text: "هو الكافي الذي منه كفاية العباد وهو الذي عليه الاعتماد يكفي العباد بفضله",
  },
  {
    id: 42,
    name: "الجليل",
    text: "هو العظيم المطلق المتصف بجميع صفات الكمال والمنعوت بكمالها المنزه عن كل نقص",
  },
  {
    id: 43,
    name: "الْكَرِيمُ",
    text: "هو الكثير الخير الجواد المعطي الذي لا ينفذ عطاؤه وهو الكريم المطلق الجامع لأنواع الخير والشرف والفضائل المحمود بفعاله",
  },
  {
    id: 44,
    name: "الرَّقِيبُ",
    text: "هو الرقيب الذي يراقب أحوال العباد ويعلم أقوالهم ويحصي أعمالهم وهو الحافظ الذي لا يغيب عنه شيء",
  },
  {
    id: 45,
    name: "الْمُجِيبُ",
    text: "هو الذي يجيب دعاء من دعاه، وسؤال من سأله، ويقابله بالعطاء والقبول، ولا يسأل أحد سواه",
  },
  {
    id: 46,
    name: "الْوَاسِعُ",
    text: "هو الذي وسع رزقه جميع خلقه، وسعت رحمته كل شيء المحيط بكل شيء",
  },
  {
    id: 47,
    name: "اَلْحَكِيمُ",
    text: "هو المحق في تدبيره اللطيف في تقديره الخبير بحقائق الأمور العليم بحكمه المقدور فجميع خلقه وقضاه خير وحكمة وعدل",
  },
  {
    id: 48,
    name: "الْوَدُودُ",
    text: "هو المحب لعباده، والمحبوب في قلوب أوليائه",
  },
  {
    id: 49,
    name: "الْمَجِيدُ",
    text: "هو الله تمجَّد بفعاله، ومجَّده خلقه لعظمته، والمجيد هو واسع الكرم، ووصف نفسه بالمجيد وهو متضمن كثرة صفات كماله وسعتها، وعدم إحصاء الخلق لها، وسعة أفعاله وكثرة خيره ودوامه. وتعني أيضاً البالغ النهاية في المجد، الكثير الإحسان الجزيل العطاء العظيم البر. تمجد",
  },
  {
    id: 50,
    name: "الباعث",
    text: "هو باعث الخلق يوم القيامة، وباعث رسله إلى العباد، وباعث المعونة إلى العبد",
  },
  {
    id: 51,
    name: "الشَّهِيدُ",
    text: "هو الحاضر الذي لا يغيب عنه شيء، فهو المطلع على كل شيء مشاهد له عليم بتفاصيله",
  },
  {
    id: 52,
    name: "الْحَقُّ",
    text: "هو الذي يحق الحق بكلماته ويؤيد أولياءه فهو المستحق للعبادة",
  },
  {
    id: 53,
    name: "الْوَكِيلُ",
    text: "هو الكفيل بالخلق القائم بأمورهم فمن توكل عليه تولاه وكفاه، ومن استغنى به أغناه وأرضاه",
  },
  {
    id: 54,
    name: "الْقَوِيّ",
    text: "هو صاحب القدرة التامة البالغة الكمال غالب لا يُغلب فقوته فوق كل قوة، ولايرد قضاءه راد، ينفذ أمره، ويمضي قضاؤه في خلقه، شديد عقابه لمن كفر بآياته وجحد حججه",
  },
  {
    id: 55,
    name: "الْمَتِينُ",
    text: "هو الشديد الذي لا يحتاج في إمضاء حكمه إلى جند أو مدد ولا إلى معين، فهو المتناهي في القوة، التي لاتلحق أفعاله مشقة، ولايمسه فيها لغوب",
  },
  {
    id: 56,
    name: "الْوَلِيُّ",
    text: "هو المحب الناصر لمن أطاعه، ينصر أولياءه، ويقهر أعداءه، والمتولي الأمور الخلائق ويحفظهم",
  },
  {
    id: 57,
    name: "الْحَمِيدُ",
    text: "هو المستحق للحمد والثناء له منتهى الحمد وأطيبه على ذاته وصفاته وعلى نعمه التي لا تحصى",
  },
  {
    id: 58,
    name: "الْـمُحصِي",
    text: "هو الذي أحصى كل شيء بعلمه، فلا يفوته منها دقيق ولا جليل",
  },
  {
    id: 59,
    name: "المبدئ",
    text: "هو الذي أنشأ الأشياء، واخترعها ابتداء من غير سابق مثال",
  },
  {
    id: 60,
    name: "المعيد",
    text: "هو الذي يعيد الخلق بعد الحياة إلى الممات في الدنيا، وبعد الممات إلى الحياة يوم القيامة",
  },
  {
    id: 61,
    name: "المُحيي",
    text: "هو خالق الحياة ومعطيها لمن شاء، يحيي الخلق من العدم ثم يحييهم بعد الموت",
  },
  {
    id: 62,
    name: "المميت",
    text: "هو مقدر الموت على كل من أماته ولا مميت سواه، قهر عباده بالموت متى شاء وكيف شاء",
  },
  {
    id: 63,
    name: "الْحَيُّ",
    text: "هو المتصف بالحياة الأبدية التي لا بداية لها ولا نهاية فهو الباقي أزلا وأبدا وهو الحي الذي لا يموت",
  },
  {
    id: 64,
    name: "الْقَيُّومُ",
    text: "هو القائم بنفسه، الغني عن غيره، وهو القائم بتدبير أمر خلقه في إنشائهم ورزقهم",
  },
  {
    id: 65,
    name: "الواجد",
    text: "هو الذي لا يعوزه شيء ولا يعجزه شيء يجد كل ما يطلبه، ويدرك كل ما يريده",
  },
  {
    id: 66,
    name: "الماجد",
    text: "هو الذي له الكمال المتناهي والعز الباهي، له العز في الأوصاف والأفعال الذي يعامل العباد بالجود والرحمة",
  },
  {
    id: 67,
    name: "الْوَاحِدُ",
    text: "هو الفرد المتفرد في ذاته وصفائه وأفعاله، واحد في ملكه لا ينازعه أحد، لا شريك له سبحانه",
  },
  {
    id: 68,
    name: "الصَّمَدُ",
    text: "هو المطاع الذي لا يقضى دونه أمر، الذي يقصد إليه في الحوائج فهو مقصد عباده في مهمات دينهم ودنياهم",
  },
  {
    id: 69,
    name: "الْقَادِرُ",
    text: "هو الذي يقدر على إيجاد المعدوم وإعدام الموجود على قدر ما تقتضي الحكمة، لا زائدا عليه ولا ناقصا عنه",
  },
  {
    id: 70,
    name: "الْمُقْتَدِرُ",
    text: "هو الذي يقدر على إصلاح الخلائق على وجه لا يقدر عليه غيره",
  },
  {
    id: 71,
    name: "الْمُقَدِّمُ",
    text: "هو الذي يقدم الأشياء ويضعها في مواضعها، فمن استحق التقديم قدمه",
  },
  {
    id: 72,
    name: "الْمُؤَخِّرُ",
    text: "هو الذي يؤخر الأشياء فيضعها في مواضعها المؤخر لمن شاء من الفجار والكفار وكل من يستحق التأخير",
  },
  {
    id: 73,
    name: "الْأَوَّلُ",
    text: "هو الذي لم يسبقه في الوجود شيء فهو أول قبل الوجود",
  },
  {
    id: 74,
    name: "الْآخِرُ",
    text: "هو الباقي بعد فناء خلقه، البقاء الأبدي يفنى الكل وله البقاء وحده، فليس بعده شيء",
  },
  {
    id: 75,
    name: "الظَّاهِرُ",
    text: "هو الذي ظهر فوق كل شيء وعلا عليه، الظاهر وجوده لكثرة دلائله",
  },
  {
    id: 76,
    name: "الْبَاطِنُ",
    text: "هو العالم ببواطن الأمور وخفاياها، وهو أقرب إلينا من حبل الوريد",
  },
  {
    id: 77,
    name: "الوالي",
    text: "هو المالك للأشياء المتصرف فيها بمشيئته وحكمته، ينفذ فيها أمره، ويجري عليها حكمه",
  },
  {
    id: 78,
    name: "الْمُتَعَالِ",
    text: "هو الذي جل عن إفك المفترين، وتنزه عن وساوس المتحيرين",
  },
  {
    id: 79,
    name: "الْبَرُّ",
    text: "هو العطوف على عباده ببره ولطفه، ومن على السائلين بحسن عطائه، وهو الصدق فيما وعد",
  },
  {
    id: 80,
    name: "التَّوَّابُ",
    text: "هو الذي يوفق عباده للتوبة حتى يتوب عليهم ويقبل توبتهم فيقابل الدعاء بالعطاء، والتوبة بغفران الذنوب",
  },
  {
    id: 91,
    name: "الْمُنْتَقِمُ",
    text: "هو الذي يقصم ظهور الطغاة، ويشدد العقوبة على العصاة، وذلك بعد الإعذار والإنذار",
  },
  {
    id: 82,
    name: "العَفُو",
    text: "هو الذي يترك المؤاخدة على الذنوب ولا يذكرك بالعيوب فهو يمحو السيئات ويتجاوز عن المعاصي",
  },
  {
    id: 83,
    name: "الرَّؤُوفُ",
    text: "هو المتعطف على المذنبين بالتوبة، الذي جاد بلطفه ومَنَّ بتعطفه، يستر العيوب ثم يعفو عنها",
  },
  {
    id: 84,
    name: "مَالِكُ الْمُلْكِ",
    text: "هو المتصرف في ملكه كيف يشاء لا راد لحكمه، ولا معقب لأمره",
  },
  {
    id: 85,
    name: "ذُو الْجَلَالِ والْإكْرَامِ",
    text: "هو المنفرد بصفات الجلال والكمال والعظمة، المختص بالإكرام والكرامة وهو أهل لأن يجل",
  },
  {
    id: 86,
    name: "المقسط",
    text: "هو العادل في حكمه، الذي ينتصف للمظلوم من الظالم، ثم يكمل عدله فيرضي الظالم بعد إرضاء المظلوم",
  },
  {
    id: 87,
    name: "الْجَامِعُ",
    text: "هو الذي جمع الكمالات كلها، ذاتا ووصفا وفعلا، الذي يجمع بين الخلائق المتماثلة والمتباينة، والذي يجمع الأولين والآخرين",
  },
  {
    id: 88,
    name: "الْغَنِيُّ",
    text: "هو الذي لا يحتاج إلى شيء، وهو المستغني عن كل ما سواه، المفتقر إليه كل من عاداه",
  },
  {
    id: 89,
    name: "المغني",
    text: "هو معطي الغنى لعباده، يغني من يشاء غناه، وهو الكافي لمن شاء من عباده",
  },
  {
    id: 90,
    name: "الْمُعْطِي",
    text: "هو الذي أعطى كل شيء",
  },
  {
    id: 91,
    name: "المانع",
    text: "يمنع العطاء عن من يشاء ابتلاء أو حماية",
  },
  {
    id: 92,
    name: "الضار",
    text: "هو المقدر للضر على من أراد كيف أراد",
  },
  {
    id: 93,
    name: "النافع",
    text: "مقدر النفع والخير لمن أراد كيف أراد كل ذلك على مقتضى حكمته سبحانه",
  },
  {
    id: 94,
    name: "النُّورُ",
    text: "هو الهادي الرشيد الذي يرشد بهدايته من يشاء فيبين له الحق، ويلهمه اتباعه، الظاهر في ذاته، المظهر لغيره",
  },
  {
    id: 95,
    name: "الْهَادِي",
    text: "هو المبين للخلق طريق الحق بكلامه يهدي القلوب إلى معرفته، والنفوس إلى طاعته",
  },
  {
    id: 96,
    name: "الْبَدِيعُ",
    text: "هو الذي لا يماثله أحد في صفاته ولا في حكم من أحكامه، أو أمر من أموره، فهو المحدث الموجد على غير مثال",
  },
  {
    id: 97,
    name: "الباقي",
    text: "هو وحده له البقاء، الدائم الوجود الموصوف بالبقاء الأزلي، غير قابل للفناء فهو الباقي بلا انتهاء",
  },
  {
    id: 98,
    name: "الْوَارِثُ",
    text: "هو الأبقى الدائم الذي يرث الخلائق بعد فناء الخلق، وهو يرث الأرض ومن عليها",
  },
  {
    id: 99,
    name: "الرشيد",
    text: "هو الذي أسعد من شاء بإرشاده، وأشقى من شاء بإبعاده، عظيم الحكمة بالغ الرشاد",
  },
  {
    id: 100,
    name: "الصبور",
    text: "هو الحليم الذي لا يعاجل العصاة بالنقمة، بل يعفوا ويؤخر، ولا يسرع بالفعل قبل أوانه",
  },
];

export default function Assma({ route, navigation }) {
  const theme = useTheme();
  const [list, setList] = useState(assma);
  const [loader, setLoader] = useState(false);
  function search(text) {
    console.log(text);
    setLoader(true);
    setTimeout(() => {
      let h = assma;
      h = h.filter(
        (e) =>
          serial(e.name).includes(serial(text)) ||
          (e.text && serial(e.text).includes(serial(text)))
      );
      setList(h);
    }, 0);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/backs_1.jpg")}
    >
      {loader && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#000000e6",
            zIndex: 999999999999999999999999999999,
            opacity: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="gold" />
        </View>
      )}
      <View
        style={{
          direction: "ltr",
          flex: 1,
        }}
      >
        <View style={{ height: 40 }}>
          <Input
            keyboardType="web-search"
            placeholder={"بحث"}
            style={{ flex: 1 }}
            onSubmitEditing={(e) => search(e.nativeEvent.text)}
          />
        </View>
        <FlashList
          estimatedItemSize={200}
          data={list}
          renderItem={(itemData) => {
            return (
              <View>
                <Pressable
                  style={styles.inAz}
                  android_ripple={{ color: "#10151f" }}
                >
                  <Card
                    style={styles.card}
                    onPress={async () =>
                      await Share.share({
                        message:
                          "من اسماء الله الحسنى  : " +
                          itemData.item.name +
                          " ," +
                          itemData.item.text,
                      })
                    }
                    footer={() => {
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Pressable
                            onPress={async () =>
                              await Share.share({
                                message:
                                  "من اسماء الله الحسنى  : " +
                                  itemData.item.name +
                                  " ," +
                                  itemData.item.text,
                              })
                            }
                          >
                            <View
                              style={{
                                justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "font1",
                                  padding: 10,
                                  fontSize: 23,
                                  color: "#006584",
                                }}
                                key={
                                  itemData.item.arab + itemData.item.arab + ""
                                }
                              >
                                مشاركة
                              </Text>
                              <Text style={{}}>
                                <Ionicons
                                  name="share-social"
                                  size={30}
                                  color={"#006584"}
                                ></Ionicons>
                              </Text>
                            </View>
                          </Pressable>
                        </View>
                      );
                    }}
                  >
                    <View style={{ justifyContent: "space-between" }}>
                      <Text
                        style={[
                          styles.inAztext,
                          {
                            fontFamily: "font2",
                            color: "#DE0A57",
                            textShadowColor: "black",
                            textShadowOffset: { height: 2, width: 2 },
                            textShadowRadius: 5,
                          },
                        ]}
                        key={itemData.item.id + 3}
                      >
                        {itemData.index + 1}
                      </Text>
                      <Text
                        style={[
                          styles.inAztext,
                          {
                            fontFamily: "font1",
                            color: "#f89b05",
                            textShadowColor: "black",
                            textShadowOffset: { height: 2, width: 2 },
                            textShadowRadius: 5,
                          },
                        ]}
                        key={itemData.item.id}
                      >
                        {itemData.item.name}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.inAztext,
                        { fontFamily: "font2", lineHeight: 40 },
                      ]}
                      key={itemData.item.id + 1}
                    >
                      {itemData.item.text}
                    </Text>
                  </Card>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, i) => {
            return item.id;
          }}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  zekr: {
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "black",
    marginVertical: 5,
  },
  card: {
    borderColor: "white",
    borderWidth: 2,
  },
  inAz: {
    fontSize: 23,
    fontFamily: "font1",
    padding: 15,
  },
  inAztext: {
    fontSize: 23,
  },
});

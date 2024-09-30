# Конвертер цветов
Этот проект был создан с использованием HTML5, CSS3 и JavaScript.

## Результат
Чтобы перейти на мой веб-сайт, используйте эту ссылку  [this link](https://lesiapashuk.github.io/Color-Picker/color.html)

## Возможности
Создать приложение/веб-приложение, позволяющее пользователю выбирать, а затем интерактивно менять цвет, показывая при этом его составляющие одновременно в трех цветовых моделях (Вариант 6: CMYK ↔ RGB ↔ HLS).

## Основные требования к приложению:
В интерфейсе необходимо предоставить пользователю возможность задавать точные цвета (поля ввода), выбирать цвета из палитры (аналогично графическим редакторам), а также плавно изменять цвета (например, с помощью ползунков). При изменении любой компоненты цвета, все остальные представления этого цвета в двух других цветовых моделях пересчитываются автоматически.

## Цветовые модели
RGB — цветовое пространство или цветовая система, которая строит все цвета на основе комбинации красного, зеленого и синего цветов. В рамках задания было запрещено напрямую использовать возможности JavaScript для получения RGB значений, поэтому сначала я получила значение #ff0000, а затем перевела его в RGB. 
CMYK (Cyan, Magenta, Yellow, Key/Black): CMYK — это цветовая модель, используемая в полиграфии, где цвета представлены процентными значениями для циана, мадженты, желтого и черного.
HSL — цветовая модель, в которой цветовыми координатами являются тон (Hue), насыщенность (Saturation) и светлота (Lightness). Важно отметить, что HSV и HSL — это две разные цветовые модели (Lightness — светлота, что отличается от яркости).

## Тесты
rgb(38, 189, 136) - hsl(159, 67%, 44%) - CMYK(80%, 0%, 28%, 26%); rgb(161, 74, 74) - hsl(0, 37%, 46%) - CMYK(0%, 54%, 54%, 37%); rgb(74, 87, 161) - hsl(231, 37%, 46%) - CMYK(54%, 46%, 0%, 37%); rgb(161, 158, 74) - hsl(58, 37%, 46%) - CMYK(0%, 2%, 54%, 37%);

## Баг
Когда вы устанавливаете значения RGB в 0, 0, 0 (чистый черный), а затем пытаетесь изменить ползунки (для HSL или CMYK), чтобы изменить цвет, возникает проблема из-за того, как работают преобразования между цветовыми моделями (RGB, CMYK и HSL), особенно при работе с черным цветом.

Вот почему это происходит:

Преобразование RGB в CMYK для черного (0, 0, 0):
Когда вы вводите rgb(0, 0, 0) в модель CMYK, это преобразуется в: C = 0, M = 0, Y = 0, K = 100%. Это означает, что компонент черного (K) доминирует, и даже если вы попробуете изменить C, M или Y, результат останется черным, так как присутствие 100% K подавляет другие компоненты.

Преобразование RGB в HSL для черного (0, 0, 0):
В модели HSL, rgb(0, 0, 0) преобразуется в: H = 0, S = 0%, L = 0%. Светлота (L = 0%) означает, что цвет полностью черный. Независимо от того, какие значения вы установите для H (тона) или S (насыщенности), результат останется черным, пока L = 0. Другими словами, изменение тона или насыщенности не повлияет на цвет, пока не увеличится светлота.

Основная проблема:
Модель CMYK: Значение K (черного) в 100% блокирует любые изменения в C, M или Y. Поэтому изменение этих значений при K = 100% не даст эффекта.
Модель HSL: При L = 0% тон и насыщенность становятся неактуальными, так как светлота находится на минимальном уровне (чистый черный), поэтому изменение этих параметров не изменит цвет, пока светлота не увеличится.

# English Color Converter

This project was created using HTML5, CSS3, and JavaScript.

## Result
To visit my website, use this link  [this link](https://lesiapashuk.github.io/Color-Picker/color.html).

## Features
Create an application/web application that allows the user to choose and then interactively change the color, simultaneously showing its components in three models (Option 6: CMYK ↔ RGB ↔ HLS).

## Main requirements for the application:
The interface should allow users to set exact colors (input fields), choose colors from a palette (similar to graphic editors), and smoothly change colors (e.g., with sliders). When any color component is changed, all other representations of the color in the two remaining color models are automatically recalculated.

## Color Models
RGB — the RGB color space or color system constructs all colors from the combination of red, green, and blue colors. In the task's constraints, it was forbidden to directly use JavaScript's capabilities to get RGB values, so I first retrieved the value #ff0000 and then converted it to RGB.
CMYK (Cyan, Magenta, Yellow, Key/Black): CMYK is a color model used in printing, where colors are represented by percentage values of cyan, magenta, yellow, and black.
HSL — a color model where the color components are hue (H), saturation (S), and lightness (L). It's important to note that HSV and HSL are two different color models (Lightness in HSL is different from brightness in HSV).

## Tests
rgb(38, 189, 136) - hsl(159, 67%, 44%) - CMYK(80%, 0%, 28%, 26%); rgb(161, 74, 74) - hsl(0, 37%, 46%) - CMYK(0%, 54%, 54%, 37%); rgb(74, 87, 161) - hsl(231, 37%, 46%) - CMYK(54%, 46%, 0%, 37%); rgb(161, 158, 74) - hsl(58, 37%, 46%) - CMYK(0%, 2%, 54%, 37%);

## Bug
When you set the RGB values to 0, 0, 0 (pure black) and then try to adjust the sliders (for HSL or CMYK) to change the color, the issue arises due to how conversions between color models (RGB, CMYK, and HSL) work, particularly when dealing with black.

Here's why this happens:

RGB to CMYK Conversion for Black (0, 0, 0):
When you input rgb(0, 0, 0) into the CMYK model, it converts to: C = 0, M = 0, Y = 0, K = 100%. This means the black (K) component dominates, and even if you try to adjust C, M, or Y, the result remains black because the presence of 100% K overrides the other components.

RGB to HSL Conversion for Black (0, 0, 0):
In the HSL model, rgb(0, 0, 0) converts to: H = 0, S = 0%, L = 0%. Lightness (L = 0%) means the color is completely black. No matter what values you set for H (hue) or S (saturation), the result remains black as long as L = 0. In other words, adjusting hue or saturation won't affect the color until lightness increases.

The Core Issue:
CMYK Model: The K (black) value being 100% overrides any changes to C, M, or Y. So adjusting these values when K = 100% will not have any effect.
HSL Model: With L = 0%, hue and saturation become irrelevant since lightness is at its lowest point (pure black), so no matter how you adjust hue or saturation, the color remains black until lightness is increased.






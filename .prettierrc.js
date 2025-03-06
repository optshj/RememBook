module.exports = {
    printWidth: 160,
    trailingComma: "all",
    tabWidth: 4, // 기본값
    semi: false, // 일부 코드에서 라인의 시작 부분에 세미 콜론 추가
    singleQuote: false,
    bracketSpacing: true, // 기본값. true인 경우 {foo:bar}는 { foo: bar }로 변환됨
    arrowParens: "avoid", // 기본값
    useTabs: false, // 기본값
    jsxBracketSameLine: true,
    bracketSameLine: true,
    parser: "typescript",
    singleAttributePerLine: false,
    trailingComma: "none",
    plugins: ["prettier-plugin-tailwindcss"]
}

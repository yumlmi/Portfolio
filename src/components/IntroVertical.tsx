import VerticalTextSection from "./VerticalTextSection";

const IntroVertical: React.FC = () => {
  return (
    <VerticalTextSection id="intro" ariaLabel="自己紹介">
      山下 結実
      <br />
      フロントエンド／バックエンドエンジニア。
      <br />
      ReactとJavaを中心に、
      <br />
      読みやすく、静かな体験をつくることを大切にしています。
      <br />
      <br />
      小説を読むように、
      <br />
      余白と流れのあるUIを。
    </VerticalTextSection>
  );
};

export default IntroVertical;

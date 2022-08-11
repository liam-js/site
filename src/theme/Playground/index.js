import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext} from 'react-live';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {usePrismTheme} from '@docusaurus/theme-common';
import styles from './styles.module.css';
function IframeWrapper(props){
  const id = 'j'+123;
  const code = props.code;
  const getSrcDoc = function(){
    let text = code.replace(/`/g, '\\`').replace(/\${/g,'\\${');
    return `
      <div id="root"></div>
      <script src="https://e.sinaimg.cn/ssfe/lima/js/app.js?v=1.0.6"></script>
      <script>
          liamRequire(['liam'],function(Liam){
            setTimeout(function(){
              const text = \`${text}\`;
              const js = Liam.toJs(text.trim());
              Liam.render(js, document.querySelector('#root'));
            }, 0);
          })
      </script>
      `;
  };

  return <iframe id={id} frame-border='0' srcDoc={getSrcDoc()} style={
    {
      transition: 'all 0.3s linear',
      width: '100%',
    }
  }  ></iframe>
  
}
function Header({children}) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
}
function LivePreviewLoader() {
  // Is it worth improving/translating?
  // eslint-disable-next-line @docusaurus/no-untranslated-text
  return <div>Loading...</div>;
}
function ResultWithHeader(props) {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.result"
          description="The result label of the live codeblocks">
          Result
        </Translate>
      </Header>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <IframeWrapper code={props.code} ></IframeWrapper>
          )}
        </BrowserOnly>
      </div>
    </>
  );
}
function ThemedLiveEditor(props) {
  const isBrowser = useIsBrowser();
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={String(isBrowser)}
      className={styles.playgroundEditor}
      onChange={props.onChange}
    />
  );
}
function EditorWithHeader(props) {
  return (
    <>
      <Header>
        <Translate
          id="theme.Playground.liveEditor"
          description="The live editor label of the live codeblocks">
          Live Editor
        </Translate>
      </Header>
      <ThemedLiveEditor onChange={props.onChange} />
    </>
  );
}
export default function Playground({children, transformCode, ...props}) {
  const {
    siteConfig: {themeConfig},
  } = useDocusaurusContext();
  const {
    liveCodeBlock: {playgroundPosition},
  } = themeConfig;
  const prismTheme = usePrismTheme();
  const noInline = props.metastring?.includes('noInline') ?? false;
  const code = children.replace(/\n$/, '');
  const [newCode, setNewCode] = React.useState(code);
  return (
    <div className={styles.playgroundContainer}>
      {/* @ts-expect-error: type incompatibility with refs */}
      <LiveProvider
        code={code}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}>
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader code={newCode} />
            <EditorWithHeader onChange={setNewCode} />
          </>
        ) : (
          <>
            <EditorWithHeader onChange={setNewCode} />
            <ResultWithHeader code={newCode} />
          </>
        )}
      </LiveProvider>
    </div>
  );
}

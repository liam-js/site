import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'JS(ON)搭建',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        可以使用  JSON 配置，或类 JSON 格式的 JS 代码,来搭建页面；代码结构与页面结构一一对应，简单清晰；方便复制粘贴、增加删除及分享
      </>
    ),
  },
  {
    title: '免编译',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        免编译，开发代码即上线代码，所写即所得；无脚手架源代码开发，方便项目复用修改
      </>
    ),
  },
  {
    title: '异步',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        JS(ON)代码及组件皆支持异步加载渲染
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { graphql } from "gatsby";
import { Box } from "components/Grid";
import { H2 } from 'components/Font';
import Preview from "components/Preview";

const work = [
  {
    href: 'https://uploadcare.com/',
    title: 'Pagedetox.com',
    description: `Запустил pagedetox.`
  },
  {
    href: 'https://jsweekdays.github.io/rnd.js/',
    title: "RND.JS",
    description: `Сделал лендинг для локального митапа, на его основе сделал 
    генерацию контента для социальных сетей с помощью puppeteer.`
  },
  {
    href: 'https://jsweekdays.github.io/rnd.js/',
    title: "Персональный сайт",
    description: `Заверстал страничку с кучей анимаций на реакте с поддержкой мобилки,
    дизайн взял у Артема Тарадаша.`
  },
  {
    href: 'https://riders.co/ru/longboard',
    title: "Riders​​.co",
    description: `Делал респонсив компоненты. Взаимодействовал с API
    бекенда с помощью саг.`
  },
  {
    href: 'https://statzilla.ru/',
    title: "Statzilla​​.ru",
    description: `Делал автоматические скрипты для сбора данных с 
    интернета. Использовал puppeteer, phantomjs и selenium.`
  },
  {
    href: 'https://tradingview.com/chart',
    title: "Tradingview.com​​",
    description: `Внедрял Webpack, делал API для интеграции брокеров с
    существующей кодовой базой, добавил пару брокеров, улучшал
    ui для торговой платформы.`
  }
];

export default ({ data }) => (
  <>
    {work
      .map((props, i) => (
        <Preview {...props} key={i} />
      ))}

    <Box mt={64}>
      <H2>Опенсорс</H2>
    </Box>

    {data.github.viewer.repositoriesContributedTo.nodes
      .map(rep => ({
        href: rep.url,
        description: rep.description,
        title: rep.name
      }))
      .map((props, i) => (
        <Preview {...props} key={i} />
      ))}
  </>
);

export const query = graphql`
  query {
    github {
      viewer {
        repositoriesContributedTo(
          contributionTypes: [COMMIT, PULL_REQUEST]
          privacy: PUBLIC
          orderBy: { direction: DESC, field: STARGAZERS }
          first: 6
        ) {
          nodes {
            name
            description
            url
          }
        }
      }
    }
  }
`;

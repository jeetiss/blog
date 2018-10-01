import React from "react";
import { graphql } from "gatsby";
import { Box } from "components/Grid";
import { H2, Low } from "components/Font";
import Preview from "components/Preview";
import Badge from "components/Badge";
import Star from "components/Star";

const work = [
  {
    to: "https://uploadcare.com/",
    title: "Pagedetox.com",
    description: `Запустил pagedetox.`,
    date: "март 2018 — сентябрь 2018"
  },
  {
    to: "https://jsweekdays.github.io/rnd.js/",
    title: "RND.JS",
    description: `Сделал лендинг для локального митапа, на его основе сделал 
    генерацию контента для социальных сетей с помощью puppeteer.`,
    date: "август 2018"
  },
  {
    to: "https://jeetiss.github.io/spizzhenyjlendos/",
    title: "Персональный сайт",
    description: `Заверстал страничку с кучей анимаций на реакте с поддержкой мобилки,
    дизайн взял у Артема Тарадаша.`,
    date: "октябрь 2017"
  },
  {
    to: "https://riders.co/ru/longboard",
    title: "Riders​​.co",
    description: `Делал респонсив компоненты. Взаимодействовал с API
    бекенда с помощью саг.`,
    date: "август 2017 - октябрь 2017"
  },
  {
    to: "https://statzilla.ru/",
    title: "Statzilla​​.ru",
    description: `Делал автоматические скрипты для сбора данных с 
    интернета. Использовал puppeteer, phantomjs и selenium.`,
    date: "март 2017 — июль 2017"
  },
  {
    to: "https://tradingview.com/chart",
    title: "Tradingview.com​​",
    description: `Внедрял Webpack, делал API для интеграции брокеров с
    существующей кодовой базой, добавил пару брокеров, улучшал
    ui для торговой платформы.`,
    date: "июль 2015 — ноябрь 2016"
  }
];

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default ({ data }) => (
  <>
    {work
      .map(data => ({ ...data, footer: <Low>{data.date}</Low> }))
      .map((props, i) => (
        <Preview {...props} key={i} />
      ))}

    <Box mt={40} mb={16}>
      <H2>Опенсорс</H2>
    </Box>

    {data.github.viewer.repositoriesContributedTo.nodes
      .map(rep => ({
        to: rep.url,
        description: rep.description,
        title: capitalize(rep.name),
        badge: (
          <Badge>
            <Star style={{margin: '5px 5px 0 0'}}/>
            {rep.stargazers.totalCount}
          </Badge>
        )
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
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

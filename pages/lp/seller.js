/* eslint-disable no-nested-ternary */
import Image from 'next/image';

import {useTheme} from '@material-ui/core/styles';
import {Box, Grid, Icon, useMediaQuery} from '@material-ui/core';

import Router from 'next/router';

import {DefaultLayout} from '~/components/Layouts';
import {ContentBlock, Button, Medias} from '~/components';
import {FeatureWidget, TopBannerWidget, SpecificationsWidget, StepWidget as ProductArrivalStep} from '~/components/Widgets';

export default function Seller() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const medias = [
    {
      id: 1,
      image: '/img/media/media1.png',
      time: '2021/07/15',
      content: '畑や果樹の権利、すし職人の所作をデジタルデータに【お金の学校】',
      url: 'https://www.google.co.jp/amp/s/news.yahoo.co.jp/amp/articles/bb8b83aecdfeb420a3f9b4f2a4ab6d65f4501698',
    },
    {
      id: 2,
      image: '/img/media/media2.png',
      time: '2021/07/15',
      content: 'Branding House、地域貢献型ECサイト「おしながき」を9月開設 日本の伝統や農業の課題解決目指す',
      url: 'https://ecnomikata.com/ecnews/31231/',
    },
    {
      id: 3,
      image: '/img/media/media3.png',
      time: '2021/07/15',
      content: 'Branding House、地域貢献型ECサイト「おしながき」を9月開設 日本の伝統や農業の課題解決目指す',
      url: 'https://netkeizai.com/articles/detail/4265',
    },
    {
      id: 4,
      image: '/img/media/media4.png',
      time: '2021/07/15',
      content: '【EC×ブロックチェーン】農産物だけでなく土地そのものも取引可能なECサイト『おしながき』がリリースへ',
      url: 'https://news.goo.ne.jp/article/netkeizai/business/netkeizai-4265.html',
    },
  ];

  const callToAction = () => {
    Router.push('/lp/seller-form');
  };

  return (
    <DefaultLayout title='Seller - Oshinagaki Store'>
      <TopBannerWidget
        imgSrc='/img/banner-seller.png'
        imgAlt='Oshinagaki Store'
        imgWidth={1366}
        imgHeight={640}
      />

      <ContentBlock
        title='おしながきストアとは？'
        description={`出品者様が価格を設定し、正当な利益が還元されます。\n
購入者と直接やり取りする手間がなく、購入者への対応や支払いは全ておしながきが請け負います。\n
出品者様は商品を発送するだけ！`}
        descriptionType='blockquote'
      >
        <Image
          alt='おしながきストアとは'
          src='/img/about-us.png'
          width={1140}
          height={480}
          layout='responsive'
        />

        <Box
          mt={isMobile ? 5 : 6}
          textAlign='center'
        >
          <Button
            variant='pill'
            customColor='red'
            customSize='extraLarge'
            endIcon={<Icon>{'chevron_right'}</Icon>}
            onClick={() => callToAction()}
          >
            {'出品者登録はこちら'}
          </Button>
        </Box>
      </ContentBlock>

      <ContentBlock
        title='おしながきストアの特徴'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        <Grid
          container={true}
          justifyContent='center'
          spacing={3}
        >
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='固定費不要'>
              {'初期登録・月額費用などは'} <br/>
              {'一切かかりません。'} <br/>
              {'出品者様のタイミングで'} <br/>
              {'出品が可能。'}
            </FeatureWidget>
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='お問い合わせ対応'>
              {'返品交換やクレームなどの対応は'} <br/>
              {'当サイトが一括対応します。'} <br/>
              {'出品者様は当サイトとの'} <br/>
              {'やりとりのみで全て解決。'}
            </FeatureWidget>
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='シンプルな出品・管理'>
              {'出品者様用の管理システムで'} <br/>
              {'注文を一括管理できます。'} <br/>
              {'注文が入ったら発送するだけ。'}
            </FeatureWidget>
          </Grid>

          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='商品PRをサポート'>
              {'どのように商品PRをしたらいいか'} <br/>
              {'わからない出品者様をサポート。'} <br/>
              {'出品ページ作成プランを提供。'}
            </FeatureWidget>
          </Grid>

          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='出品者様をサポート'>
              {'ECサイトの利用方法が分からない'} <br/>
              {'出品者様を商品の出品から'} <br/>
              {'管理方法までサポート。'}
            </FeatureWidget>
          </Grid>

        </Grid>
      </ContentBlock>

      <ContentBlock>
        <Box my={4}>
          <Image
            src='/img/product-arrival-cycle.png'
            layout='responsive'
            width={1366}
            height={688}
            alt='Product Arrival Cycle'
          />
        </Box>
      </ContentBlock>

      <ContentBlock
        title='おしながきストアの出品料'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        <Grid
          container={true}
          justifyContent='center'
          spacing={3}
        >
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='固定費不要'>
              <Box mb={-3}>
                <Image
                  src='/img/fee-01.png'
                  layout='responsive'
                  width={540}
                  height={682}
                  alt='Store fee 01'
                />
              </Box>
            </FeatureWidget>
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='販売手数料'>
              <Box mb={-3}>
                <Image
                  src='/img/fee-02.png'
                  layout='responsive'
                  width={540}
                  height={682}
                  alt='Store fee 02'
                />
              </Box>
            </FeatureWidget>
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <FeatureWidget title='販売価格'>
              <Box mb={-3}>
                <Image
                  src='/img/fee-03.png'
                  layout='responsive'
                  width={540}
                  height={682}
                  alt='Store fee 03'
                />
              </Box>
            </FeatureWidget>
          </Grid>

        </Grid>

        <Box
          mt={2}
          textAlign='center'
          fontWeight={700}
        >
          {'＊うち2%を地域へ還元'}
        </Box>

        <Box
          mt={isMobile ? 3 : 5}
          textAlign='center'
        >
          <Button
            variant='pill'
            customColor='red'
            customSize='extraLarge'
            endIcon={<Icon>{'chevron_right'}</Icon>}
            onClick={() => callToAction()}
          >
            {'出品者登録はこちら'}
          </Button>
        </Box>
      </ContentBlock>

      <ContentBlock
        title='簡単！出品までのステップ'
      >
        <Grid
          container={true}
          justifyContent='center'
          spacing={3}
        >
          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <ProductArrivalStep
              title='Step1'
            >
              <Box
                fontWeight='bold'
                lineHeight={5}
              >
                {'まずは出品者登録の申請！'}
              </Box>
              <Box
                textAlign='center'
                mt={2}
                mb={-4}
              >
                <Image
                  width={115}
                  height={192}
                  alt='簡単３ステップで商品到着 - STEP1'
                  src='/img/seller-step-1.png'
                />
              </Box>
            </ProductArrivalStep>
          </Grid>

          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <ProductArrivalStep
              title='Step2'
            >
              <Box
                fontWeight='bold'
                my={isTablet ? 1 : 3}
                px={3}
              >
                {'３営業日以内に審査結果のご連絡をします。'}
              </Box>
              <Box
                textAlign='center'
                mt={2}
                mb={-4}
              >
                <Image
                  width={114}
                  height={192}
                  alt='簡単３ステップで商品到着 - STEP2'
                  src='/img/seller-step-2.png'
                />
              </Box>
            </ProductArrivalStep>
          </Grid>

          <Grid
            item={true}
            xs={12}
            sm={4}
          >
            <ProductArrivalStep
              title='Step3'
            >
              <Box
                fontWeight='bold'
                fontSize={isMobile ? '1.25rem' : (isTablet ? '0.75rem' : 'inherit')}
              >
                {'審査に通過したら出品準備完了！'} <br/>
                {'ページを作成し商品を出品しま'} <br/>
                {'しょう！'}
              </Box>
              <Box
                textAlign='center'
                mt={2}
                mb={-4}
              >
                <Image
                  width={201}
                  height={192}
                  alt='簡単３ステップで商品到着 - STEP3'
                  src='/img/seller-step-3.png'
                />
              </Box>
            </ProductArrivalStep>
          </Grid>
        </Grid>
      </ContentBlock>

      <ContentBlock
        title='おしながきストアの出品基準'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        <SpecificationsWidget
          specs={[
            '国内で生産されている商品であること',
            '商品情報をできる限り多く記載できること',
            '責任を持って商品を出品できる生産者であること',
            '各生産品ごとの基準は出品者登録のページからご確認ください。',
          ]}
        />

        <Box
          mt={isMobile ? 5 : 6}
          textAlign='center'
        >
          <Button
            variant='pill'
            customColor='red'
            customSize='extraLarge'
            endIcon={<Icon>{'chevron_right'}</Icon>}
            onClick={() => callToAction()}
          >
            {'出品者登録はこちら'}
          </Button>
        </Box>
      </ContentBlock>

      <ContentBlock
        title='メディア掲載'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
      >
        <Medias medias={medias}/>
      </ContentBlock>
    </DefaultLayout>
  );
}

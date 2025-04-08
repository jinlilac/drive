import { useLocation, useSearchParams } from 'react-router-dom';
import { useOAuth } from '@/apis/OAuth';
import { useEffect, useState } from 'react';
import Loading from '@/components/atoms/Loading';
import SignInTemplate from '@/components/templates/SignIn.template/SignIn.template';
import Container from '@/components/atoms/Container';
import useOverlayStore from '@/stores/useOverlayStore';
import Overlay from '@/components/atoms/ Overlay';
import { styled } from 'styled-components';

const OauthWrap = styled(Container.FlexCol)`
  position: relative;
  height: 100%;
  min-width: 480px;
  justify-content: center;
`;
const LoaderWrap = styled(Container.FlexCol)`
  position: absolute;
  border-radius: 8px;
  z-index: 999;
  width: 100%;
  align-items: center;
`;

export default function OAuth() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { openOverlay } = useOverlayStore();
  const [loader, setLoader] = useState<boolean>(false);

  const social = pathname.split('/')[3];
  const { oauth, isPending } = useOAuth(social);
  useEffect(() => {
    openOverlay();
    setLoader(true);
    oauth({ code: searchParams.get('code') as string });
  }, []);
  return (
    <OauthWrap>
      <Overlay />
      <Loading />
      <SignInTemplate />
      {loader && (
        <LoaderWrap>
          <Loading />
        </LoaderWrap>
      )}
    </OauthWrap>
  );
}

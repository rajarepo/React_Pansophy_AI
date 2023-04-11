import { Button } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function UnauthorizedAccess() {
  const { t } = useTranslation('/UnauthorizedAccessPage/ns');
  return (
    <div className="d-flex h-screen ">
      <div className="col-md-6 my-auto p-10 md:p-20">
        <div>
          <img
            src="/icon/logo.svg"
            alt={t('suspendedTitle')}
            className="w-20 h-20"
          />
          <h3 className="text-4xl text-white font-normal mt-5">{t('title')}</h3>
          <p className="custom-text-light border-b-1 border-indigo-900 mb-5 text-base border-dashed-bottom pb-5">
            Sorry, You are not authorized to access this page. In order to
            access this page you must be logged in with valid credentials.
          </p>
        </div>

        <div>
          <Link to="/sign-in">
            <Button htmlType="button">Login with Username & Password</Button>
          </Link>
        </div>
      </div>
      <div className="col d-none d-md-flex bg-custom-secondary flex items-center justify-center">
        <img src="/icon/unauthorized-access.svg" alt="" />
      </div>
    </div>
  );
}

export default UnauthorizedAccess;

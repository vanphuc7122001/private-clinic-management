import {
  bagIcon,
  member1,
  member2,
  member3,
  member4,
  new1,
  new2,
  searchIcon,
  searchUserIcon,
  service
} from '~/utils/export'
import { FaTooth } from 'react-icons/fa'
import { hero1, hero2 } from '~/utils/export'
import { useQuery } from '@tanstack/react-query'
import doctorApi from '~/apis/doctor.api'
import { Link } from 'react-router-dom'
import newsApi from '~/apis/news.api'

export default function Home() {
  const doctorsQuery = useQuery({
    queryKey: ['doctors', 1],
    queryFn: () => doctorApi.getDoctors({ page: 1, limit: 4 })
  })

  const newsQuery = useQuery({
    queryKey: ['news', 1],
    queryFn: () => newsApi.getNews({ page: 1, limit: 2 })
  })
  return (
    <>
      <div className='hero-header'>
        <div className='container-app'>
          <section className='hero'>
            <section className='hero__content'>
              <h1 className='hero__heading'>Chăm sóc y tế tại phòng khám của chúng tôi.</h1>
              <p className='hero__desc desc'>
                Chăm sóc đặc biệt mọi độ tuổi . Nụ cười của bạn là niềm vui của chúng tôi
              </p>
              <div className='hero__row'>
                <a href='#!' className='btn'>
                  Đặt lịch
                </a>
                <span className='hero__phone'> Hoặc gọi (+84) 4567890 </span>
              </div>
            </section>
            <div className='hero__media'>
              <figure className='hero_images'>
                <img src={hero1} alt='hero' className='hero_img' />
                <img src={hero2} alt='hero' className='hero_img' />
              </figure>
            </div>
          </section>
        </div>
      </div>
      <main>
        <section id='service' className='services'>
          <div className='container-app'>
            <h2 className='service__heading heading'>Dịch vụ của chúng tôi</h2>
            <p className='service__desc desc'>
              Chăm sóc đặc biệt mọi độ tuổi . Nụ cười của bạn là niềm vui của chúng tôi.
            </p>
            <div className='service__row'>
              <figure>
                <img src={service} alt='sevice' className='service__img' />
              </figure>
              <div className='service__info'>
                <div className='service__list'>
                  <section className='service-item'>
                    <span className='service-item__icon'>
                      <FaTooth />
                    </span>
                    <div className='service-item__body'>
                      <h4 className='heading service-item__heading'>Xét nghiệm máu</h4>
                      <p className='desc service-item__desc line-clamp'>
                        Xét nghiệm máu - cửa sổ mở ra để khám phá bí mật của sức khỏe, nơi những dòng thông tin nhỏ nhất
                        có thể giải mã câu chuyện lớn về trạng thái tổng thể của cơ thể.
                      </p>
                    </div>
                  </section>
                  <section className='service-item'>
                    <span className='service-item__icon'>
                      <FaTooth />
                    </span>
                    <div className='service-item__body'>
                      <h4 className='heading service-item__heading'>Đo điện tim</h4>
                      <p className='desc service-item__desc line-clamp'>
                        Đo điện tim - như là một ngôn ngữ âm nhạc của trái tim, nó không chỉ là bảng điều khiển của sức
                        khỏe mà còn là hòa nhạc tinh tế của cuộc sống, nơi nhịp đập tạo nên bản giao hưởng riêng biệt
                        của mỗi người.
                      </p>
                    </div>
                  </section>
                  <section className='service-item'>
                    <span className='service-item__icon'>
                      <FaTooth />
                    </span>
                    <div className='service-item__body'>
                      <h4 className='heading service-item__heading'>Nội soi</h4>
                      <p className='desc service-item__desc line-clamp'>
                        Nội soi - bí mật của y học mở ra trước mắt, như một chiếc kính phép thuật, cho phép chúng ta
                        nhìn thấy những khám phá tinh tế, khám phá vẻ đẹp ẩn sau lớp vỏ, và khám phá những bí ẩn của cơ
                        thể.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='work'>
          <div className='container-app'>
            <h2 className='heading work__heading'>Tìm kiếm</h2>
            <p className='desc work__desc'>
              Chăm sóc đặc biệt mọi độ tuổi . Nụ cười của bạn là niềm vui của chúng tôi.
            </p>
            <div className='work__list'>
              {/* Work item 1  */}
              <Link to='/doctors'>
                <section className='work-item'>
                  <img src={searchIcon} className='work-item__icon' />
                  <h3 className='work-item__heading heading'>Tìm bác sỉ</h3>
                  <p className='desc work-item__desc line-clamp'>
                    Tìm kiếm bác sĩ theo trình độ học vấn, bằng cấp hoặc kinh nghiệm-liên hệ để yêu cầu.
                  </p>
                  <a href='#!' className='work-item__more'>
                    Learn more
                  </a>
                </section>
              </Link>
              {/* Work item 2  */}
              <Link to={`/doctors`}>
                <section className='work-item'>
                  <img src={searchUserIcon} className='work-item__icon' />
                  <h3 className='work-item__heading heading'>Tìm bác sĩ tốt nhất</h3>
                  <p className='desc work-item__desc line-clamp'>
                    Tìm kiếm bác sĩ theo trình độ học vấn, bằng cấp hoặc kinh nghiệm-liên hệ để yêu cầu.
                  </p>
                  <a href='#!' className='work-item__more'>
                    Learn more
                  </a>
                </section>
              </Link>
              {/* Work item 3  */}
              <Link to='/news'>
                <section className='work-item'>
                  <img src={bagIcon} className='work-item__icon' />
                  <h3 className='work-item__heading heading'>Tìm tin tức</h3>
                  <p className='desc work-item__desc line-clamp'>
                    Khám phá các thông tin về các chuyên gia y tế dựa trên trình bài viết từ kinh nghiệm của bác sỉ
                    chuyên ngành. Đừng ngần ngại liên hệ để có thêm thông tin chi tiết hoặc yêu cầu các thông tin cần
                    thiết.
                  </p>
                  <a href='#!' className='work-item__more'>
                    Learn more
                  </a>
                </section>
              </Link>
            </div>
          </div>
        </section>

        <section id='doctor' className='member'>
          <div className='container-app'>
            <header className='member__header'>
              <h2 className='heading member__heading'>Bác sỉ của chúng tôi</h2>
              <p className='service__desc desc'>
                Chăm sóc đặc biệt mọi độ tuổi . <br /> Nụ cười của bạn là niềm vui của chúng tôi.
              </p>
            </header>
            <div className='member__list gap-5'>
              {/* Item 1  */}
              {doctorsQuery.data?.data.result.doctors.map((doctor) => (
                <Link key={doctor.doctor_id} to={`/doctors/${doctor.doctor_id}`}>
                  <section className='member-item'>
                    <figure className='member-item__img'>
                      <img className='member-item__thumb' src={doctor.doctor.avatar || member1} />
                    </figure>
                    <h3 className='member-item__name'>{doctor.doctor.name}</h3>
                    <p className='desc member-item__title'>{doctor.education}</p>
                  </section>
                </Link>
              ))}
            </div>
            <div className='member__btn'>
              <Link to='/doctors' className='btn'>
                Xem thêm
              </Link>
            </div>
          </div>
        </section>

        <section className='new'>
          <div className='container-app'>
            <div className='new__inner'>
              <section className='new__content'>
                <h2 className='heading new__content-heading'>Tin tức mới nhất &amp; Sự kiện.</h2>
                <Link to={`/news`} className='new__content-read'>
                  Đọc thêm
                </Link>
              </section>
              <div className='new__list'>
                {newsQuery.data?.data.result.news.map((item) => (
                  <Link key={item.id} to={`/news${item.id}`}>
                    <article className='new-item'>
                      <figure className='new-item__img'>
                        <img className='new-item__thumb' src={new1} />
                      </figure>
                      <section className='new-item__body'>
                        <h3 className='new-item__heading heading'>{item.title}</h3>
                        <p className='desc new-item__desc line-clamp'>{item.description}</p>
                        <a href='#!' className='new-item_more'>
                          Learn more
                        </a>
                      </section>
                    </article>
                  </Link>
                ))}

                {/* Item 2 */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

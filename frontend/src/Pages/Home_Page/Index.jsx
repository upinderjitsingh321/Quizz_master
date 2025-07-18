import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaPlay,
  FaBook,
  FaAward,
  FaGraduationCap,
  FaGlobe,
  FaFlask,
  FaFilm,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../context_API";
import { toast } from "react-toastify";
import { useState } from "react";
const QuizMasterHomepage = () => {
  const { token } = useContext(Authcontext);
  const [toastCooldown, setToastCooldown] = useState(false);

  const navigate = useNavigate();

  const handleChange = () => {
    if (!token) {
      if (!toastCooldown) {
        toast.info("Please Signup Or Login");
        setToastCooldown(true);
      } else {
        setTimeout(() => {
          setToastCooldown(false);
        }, 6000);
      }
    } else {
      navigate("/select_quiz");
    }
  };
  return (
    <div className="">
      {/* Hero Section */}
      <header className=" py-5">
        <div>
          <Row className="text-center">
            <Col className="mb-4 mb-md-0 text-center">
              <h1 className="display-4 fw-bold mb-3">
                Become a <span className="text-warning">QuizMaster</span>
              </h1>
              <p className="lead mb-4">
                Challenge your knowledge across thousands of topics. Play solo
                compete yourself !
              </p>
              <div className="">
                <Button
                  variant="warning"
                  className="fw-bold"
                  onClick={handleChange}
                >
                  <FaPlay className="me-2" /> Start Quiz
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-5">
        <div>
          <Row className="g-4">
            <Col md={4}>
              <div className="bg-white p-4 rounded text-center border">
                <h3 className="text-primary">10,000+</h3>
                <p className="text-muted">Questions Available</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white p-4 rounded text-center border">
                <h3 className="text-primary">500K+</h3>
                <p className="text-muted">Active Players</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="bg-white p-4 rounded text-center border">
                <h3 className="text-primary">50+</h3>
                <p className="text-muted">Categories</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Featured Quizzes */}
      <section className="py-5 bg-white">
        <div>
          <h2 className="text-center mb-4 fw-bold">Featured Quizzes</h2>
          <p className="text-center text-muted mb-5">
            Explore our most popular quizzes across various categories
          </p>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <div
                  className="bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{ height: "180px" }}
                >
                  <FaGlobe size={60} />
                </div>
                <Card.Body>
                  <Card.Title>World Capitals</Card.Title>
                  <Card.Text className="text-muted">
                    Test your knowledge of world geography with this challenging
                    quiz.
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      Geography
                    </span>
                    <small className="text-muted">20 Questions</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <div
                  className="bg-success text-white d-flex justify-content-center align-items-center"
                  style={{ height: "180px" }}
                >
                  <FaFlask size={60} />
                </div>
                <Card.Body>
                  <Card.Title>Science Master</Card.Title>
                  <Card.Text className="text-muted">
                    Are you a science genius? Prove it with our advanced science
                    quiz.
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-success bg-opacity-10 text-success">
                      Science
                    </span>
                    <small className="text-muted">15 Questions</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0">
                <div
                  className="bg-danger text-white d-flex justify-content-center align-items-center"
                  style={{ height: "180px" }}
                >
                  <FaFilm size={60} />
                </div>
                <Card.Body>
                  <Card.Title>Movie Trivia</Card.Title>
                  <Card.Text className="text-muted">
                    How well do you know your movies? Take this quiz to find
                    out!
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span className="badge bg-danger bg-opacity-10 text-danger">
                      Entertainment
                    </span>
                    <small className="text-muted">25 Questions</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-5">
            <Button
              variant="primary"
              size="lg"
              className="fw-bold"
              onClick={handleChange}
            >
              Browse All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Updated Features Section */}
      <section className="py-5 bg-white">
        <div>
          <h2 className="text-center mb-4 fw-bold">Deep Dive Learning</h2>
          <p className="text-center mb-5">
            Our comprehensive quizzes are designed for thorough knowledge
            mastery
          </p>

          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <FaBook size={30} className="text-primary" />
              </div>
              <h4>Comprehensive Content</h4>
              <p className="text-muted">
                Detailed quizzes covering all key aspects of each subject area.
              </p>
            </Col>

            <Col md={4} className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <FaGraduationCap size={30} className="text-success" />
              </div>
              <h4>Structured Learning</h4>
              <p className="text-muted">
                Progress through difficulty levels as your knowledge grows.
              </p>
            </Col>

            <Col md={4} className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <FaAward size={30} className="text-warning" />
              </div>
              <h4>Mastery Awards</h4>
              <p className="text-muted">
                Earn achievements as you demonstrate subject mastery.
              </p>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="text-center">
          <h2 className="fw-bold mb-4">Ready to Test Your Knowledge?</h2>
          <p className="lead mb-5">
            Players who are challenging themselves daily with QuizMaster.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="warning"
              size="lg"
              className="fw-bold"
              onClick={handleChange}
            >
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizMasterHomepage;
